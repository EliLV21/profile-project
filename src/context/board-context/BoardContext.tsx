'use client';
import { Board, BoardAction } from '@/app/types/types';
import { dataTable } from '@/data';
import supabase from '@/supabaseClient';
import React, { createContext, useReducer, useEffect, useState, PropsWithChildren } from 'react';

const initialBoard: Board = {
  columns: dataTable,
  ordered: Object.keys(dataTable),
};

interface BoardContextType {
  boardState: typeof initialBoard;
  dispatch: React.Dispatch<BoardAction>;
}

const BoardContext = createContext<BoardContextType | null>(null);

export const BoardProvider = ({ children }: PropsWithChildren) => {
  const [boardState, dispatch] = useReducer(boardReducer, initialBoard);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadBoard();
  }, []);

  const loadBoard = async () => {
    setLoading(true);
    const { data } = await supabase.from('demo-app').select('*');
    if (data) {
      const groupedData = data.reduce((acc: { [x: string]: any[] }, item: { [x: string]: any; type_column: any }) => {
        const { type_column, ...rest } = item;
        if (!acc[type_column]) {
          acc[type_column] = [];
        }
        acc[type_column].push(rest);
        return acc;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, {} as Record<string, any[]>);

      const columns = Object.keys(groupedData).reduce((acc, key) => {
        acc[key] = groupedData[key];
        return acc;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, {} as Record<string, any[]>);

      const ordered = Object.keys(columns);

      dispatch({ type: 'SET_BOARD', payload: { columns, ordered } });
    }
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return <BoardContext.Provider value={{ boardState, dispatch }}>{children}</BoardContext.Provider>;
};

export const useBoard = () => {
  return React.useContext(BoardContext);
};

const boardReducer = (state: Board, action: BoardAction): Board => {
  switch (action.type) {
    case 'ADD_TASKS': {
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          ['Backlog']: [action.payload, ...state.columns.Backlog],
        },
      };
      localStorage.setItem('board', JSON.stringify(newState));
      return newState;
    }
    case 'SET_TASKS': {
      const tag = action.payload.tag;
      if (!Array.isArray(state.columns[tag])) {
        state.columns[tag] = [];
      }

      const updatedColumn = state.columns[tag].map(item => {
        // Perform some operation on each item
        return item;
      });

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [tag]: updatedColumn,
        },
      };
      return newState;
    }
    case 'REMOVE_TASK': {
      const taskRemoveId = action.payload.id;
      const newState = { ...state };
      Object.keys(newState.columns).forEach(column => {
        newState.columns[column] = newState.columns[column].filter(task => task.id !== taskRemoveId);
      });
      supabase.from('demo-app').delete().eq('id', taskRemoveId);
      localStorage.setItem('board', JSON.stringify(newState));
      return newState;
    }
    case 'MOVE_TASK': {
      if (action.payload.source.droppableId === action.payload.destination.droppableId) {
        const reorder = [...state.columns[action.payload.source.droppableId]];
        const [movedTask] = reorder.splice(action.payload.source.index, 1);
        reorder.splice(action.payload.destination.index, 0, movedTask);

        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [action.payload.source.droppableId]: reorder,
          },
        };

        supabase
          .from('demo-app')
          .update({ type_column: action.payload.destination.droppableId })
          .eq('id', movedTask.id);

        localStorage.setItem('board', JSON.stringify(newState));
        return newState;
      }

      const startTask = [...state.columns[action.payload.source.droppableId]];
      const finishTask = [...state.columns[action.payload.destination.droppableId]];

      const [movedTask] = startTask.splice(action.payload.source.index, 1);
      finishTask.splice(action.payload.destination.index, 0, movedTask);

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.source.droppableId]: startTask,
          [action.payload.destination.droppableId]: finishTask,
        },
      };
      localStorage.setItem('board', JSON.stringify(newState));

      return newState;
    }
    case 'MOVE_COLUMN': {
      const result = [...state.ordered];
      const [removed] = result.splice(action.payload.source.index, 1);
      result.splice(action.payload.destination.index, 0, removed);

      const newState = { ...state, ordered: result };
      localStorage.setItem('board', JSON.stringify(newState));
      return newState;
    }
    case 'SET_BOARD': {
      return {
        ...state,
        columns: action.payload.columns,
        ordered: action.payload.ordered,
      };
    }
    // Otros casos del reducer...
    default:
      return state;
  }
};
