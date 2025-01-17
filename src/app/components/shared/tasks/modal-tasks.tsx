'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useBoard } from '@/context/board-context/BoardContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { addTaskSchema } from '@/schema';
import { ChartCandlestick, PlusIcon } from 'lucide-react';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import supabase from '@/supabaseClient';
import { Task } from '@/types/types';
import { DialogOverlay } from '@radix-ui/react-dialog';

export const TasksModal = ({
  setShowForm,
  showForm,
}: {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  showForm: boolean;
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const form = useForm<z.infer<typeof addTaskSchema>>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      task: '',
      description: '',
    },
  });

  const boardContext = useBoard();
  if (!boardContext) {
    throw new Error('BoardContext is null');
  }
  const { dispatch } = boardContext;
  const [tag, setTag] = useState('Low');

  const handleSubmitForm = async ({ task, description }: z.infer<typeof addTaskSchema>) => {
    if (typeof window !== 'undefined') {
      dispatch({
        type: 'ADD_TASKS',
        payload: {
          id: Math.random().toString(),
          created_at: new Date().toDateString(),
          type_column: 'Backlog',
          tag,
          description,
          task,
        },
      });
    }
    setShowForm(!showForm);
    let tagTask;
    switch (tag) {
      case 'Low':
        tagTask = 1;
        break;
      case 'Medium':
        tagTask = 2;
        break;
      case 'High':
        tagTask = 3;
        break;
      default:
        tagTask = 1;
    }
    const { data } = await supabase
      .from('demo-app')
      .insert([{ task, description_task: description, tag_task: tagTask }]);

    if (data) {
      setTasks([...tasks, ...data]);
    }
  };

  return (
    <>
      <Dialog>
        <DialogOverlay onClick={() => setShowForm(!showForm)} />
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="px-5 flex justify-center items-center mt-0 space-y-0"
            onClick={() => setShowForm(!showForm)}
          >
            <PlusIcon className={`${cn(showForm ? 'rotate-45' : '')} w-5 h-5`} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)}>
              <Card>
                <CardContent className="mt-[1rem]">
                  <div className="flex items-end justify-between gap-3">
                    <FormField
                      control={form.control}
                      name="task"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Title</FormLabel>
                          <FormMessage className="w-full" />
                          <FormControl>
                            <Input autoFocus placeholder="Tell me your task" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="max-w-[10em]">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="w-full" asChild>
                          <Button variant="outline" className="flex justify-center items-center">
                            <ChartCandlestick />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[100px] bg-white border rounded">
                          <DropdownMenuLabel className="p-2">Priority</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className={`${cn(tag === 'Low' && 'bg-blue-400')} font-medium leading-none text-sm p-2`}
                            onClick={() => setTag('Low')}
                          >
                            <Label>Low</Label>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className={`${cn(
                              tag === 'Medium' && 'bg-yellow-400'
                            )} font-medium leading-none text-sm p-2`}
                            onClick={() => setTag('Medium')}
                          >
                            <Label>Medium</Label>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className={`${cn(tag === 'High' && 'bg-red-400')} font-medium leading-none text-sm p-2`}
                            onClick={() => setTag('High')}
                          >
                            <Label>High</Label>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Description</FormLabel>
                          <FormMessage className="w-full" />
                          <FormControl>
                            <Textarea autoFocus placeholder="Description" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Submit</Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
