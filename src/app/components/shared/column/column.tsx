import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { CardList } from '../tasks/card-list';
import { Task } from '@/app/types/types';

interface ColumnProps {
  listTitle: string;
  listTasks: Task[];
  index: number;
}

export const Column: React.FC<ColumnProps> = ({ listTitle, index, listTasks }) => {
  return (
    <div className="w-fit">
      <Draggable draggableId={`column-${index}`} index={index}>
        {(provided: DraggableProvided) => (
          <div
            className={`text-center ${
              listTasks.length >= 1 ? `w-[${Math.round(100 / (listTasks.length + 1))}vw]` : 'w-[300px]'
            }`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardList
              listTasks={listTasks}
              listType="TASK"
              listId={listTitle}
              isDropDisabled={false}
              listTitle={listTitle}
            />
          </div>
        )}
      </Draggable>
    </div>
  );
};
