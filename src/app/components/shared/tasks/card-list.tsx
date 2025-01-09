'use client';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  Droppable,
} from 'react-beautiful-dnd';
import CardItem from './card-item';
import { useState } from 'react';
import { TasksModal } from './modal-tasks';
import { Task } from '@/app/types/types';
import { Card, CardHeader } from '@/components/ui/card';

type CardListProps = {
  listTitle?: string;
  listId?: string;
  listType?: string;
  listTasks: Task[];
  isDropDisabled?: boolean;
};

export const CardList: React.FC<CardListProps> = ({
  listTitle,
  listId = 'LIST',
  listType,
  listTasks,
  isDropDisabled,
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      isCombineEnabled
      ignoreContainerClipping={false}
      isDropDisabled={isDropDisabled}
    >
      {(dropProvided: DroppableProvided) => (
        <Card
          {...dropProvided.droppableProps}
          ref={dropProvided.innerRef}
          className={`bg-white rounded-md shadow-md h-[75vh] w-[300px] overflow-hidden`}
        >
          <CardHeader className="flex flex-row justify-between items-center h-20">
            {listTitle}
            {listTitle === 'Backlog' && <TasksModal setShowForm={setShowForm} showForm={showForm} />}
          </CardHeader>
          {/* {dropProvided.placeholder} */}
          <InnerList listTasks={listTasks} dropProvided={dropProvided} title={listTitle} />
        </Card>
      )}
    </Droppable>
  );
};

type InnerListProps = {
  listTasks: Task[];
  dropProvided: DroppableProvided;
  title?: string;
};

const InnerList = ({ listTasks, dropProvided }: InnerListProps) => {
  console.log(listTasks);
  return (
    <div
      ref={dropProvided.innerRef}
      className="w-full h-[150px] grid grid-cols-1 gap-3 overflow-hidden bg-red-500 contents inline-grid "
    >
      {listTasks &&
        listTasks.map((task, index) => {
          return (
            <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
              {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                <CardItem task={task} isDragging={dragSnapshot.isDragging} provided={dragProvided} />
              )}
            </Draggable>
          );
        })}
      {dropProvided.placeholder}
    </div>
  );
};
