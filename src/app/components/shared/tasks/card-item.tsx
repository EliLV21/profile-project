import { DraggableProvided } from 'react-beautiful-dnd';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Task } from '@/app/types/types';
import { useBoard } from '@/context/board-context/BoardContext';
import { cn } from '@/lib/utils';
import React from 'react';

interface CardItemProps {
  task: Task;
  isDragging: boolean;
  provided: DraggableProvided;
}

const CardItem: React.FC<CardItemProps> = ({ task, isDragging, provided }) => {
  const boardContext = useBoard();
  if (!boardContext) {
    return null; // or handle the null case appropriately
  }
  const { dispatch } = boardContext;

  return (
    <li className="w-[95%]" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <Card className={`${cn(isDragging ? 'bg-slate-50' : '')} m-2`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>{`${task.task} - ${task.id}`}</CardTitle>
            <Button
              variant={'destructive'}
              size={'sm'}
              onClick={() => {
                dispatch({ type: 'REMOVE_TASK', payload: { id: task.id } });
              }}
            >
              Delete
            </Button>
          </div>
        </CardHeader>
        {task.description && (
          <CardContent className="pb-3">
            <CardDescription>{task.description}</CardDescription>
          </CardContent>
        )}
        <CardFooter className="flex justify-between">
          <div className="flex h-6 items-center gap-2">
            <CardDescription>
              {
                // typeof window !== 'undefined' &&
                new Date(task.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                  day: 'numeric',
                })
              }
            </CardDescription>
          </div>
          <CardDescription
            className={`${
              task.tag === 'High'
                ? 'text-red-500 bg-red-50'
                : task.tag === 'Medium'
                ? 'text-yellow-500 bg-yellow-50'
                : 'text-blue-500 bg-blue-50'
            } text-xs rounded px-2 py-1`}
          >
            {task.tag}
          </CardDescription>
        </CardFooter>
      </Card>
    </li>
  );
};

export default React.memo<CardItemProps>(CardItem);
