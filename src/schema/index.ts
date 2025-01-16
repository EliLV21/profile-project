import * as z from 'zod';

export const addTaskSchema = z.object({
  task: z.string().min(2, { message: 'Enter at least 2 characters' }).max(15),
  description: z.string().max(200),
});

export const addNotesSchema = z.object({
  title: z.string().min(2, { message: 'Enter at least 2 characters' }).max(15),
  description: z.string().max(200),
});

export const addFeedbackSchema = z.object({
  name: z.string().min(2, { message: 'Enter at least 2 characters' }).max(15),
  email: z.string().email(),
  feedback: z.string().max(200),
});
