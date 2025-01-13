import { DraggableLocation } from 'react-beautiful-dnd';

export type Task = {
  id: string;
  created_at: string;
  task: string;
  tag: string;
  description: string;
  type_column: string;
};

export type TaskMap = {
  [key: string]: Task[];
};

export type Board = {
  columns: TaskMap;
  ordered: string[];
};

export type BoardAction =
  | { type: 'ADD_TASKS'; payload: Task }
  | { type: 'SET_TASKS'; payload: Task }
  | { type: 'REMOVE_TASK'; payload: RemoveTaskPayload }
  | { type: 'MOVE_TASK'; payload: OnDragPayload }
  | { type: 'MOVE_COLUMN'; payload: OnDragPayload }
  | { type: 'SET_BOARD'; payload: { columns: TaskMap; ordered: string[] } };

type RemoveTaskPayload = {
  id: string;
};

type OnDragPayload = {
  source: DraggableLocation;
  destination: DraggableLocation;
};

export type NotesAccordion = {
  id: string;
  title: string;
  description: string;
};
