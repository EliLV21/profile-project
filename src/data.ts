import { TaskMap } from './app/types/types';

export const dataTable: TaskMap = {
  Doing: [
    {
      id: '1',
      task: 'Task 1',
      tag: 'Task 1',
      created_at: '2022-01-01',
      description: 'https://via.placeholder.com/150',
      type_column: 'Doing',
    },
    {
      id: '2',
      task: 'Task 2',
      tag: 'Task 2',
      created_at: '2022-01-01',
      description: '',
      type_column: 'Doing',
    },
  ],
  Done: [],
  Review: [
    {
      id: '7',
      task: 'Task 7',
      tag: 'Task 7',
      created_at: '2022-01-01',
      description: 'https://via.placeholder.com/150',
      type_column: 'Review',
    },
  ],
  Backlog: [
    {
      id: '10',
      task: 'Task 10',
      tag: 'Task 10',
      created_at: '2022-01-01',
      description: 'https://via.placeholder.com/150',
      type_column: 'Backlog',
    },
  ],
};
