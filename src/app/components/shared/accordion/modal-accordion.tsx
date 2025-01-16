'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useBoard } from '@/context/board-context/BoardContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { z } from 'zod';
import { addNotesSchema } from '@/schema';
import supabase from '@/supabaseClient';
import { DialogOverlay } from '@radix-ui/react-dialog';
import { NotesAccordion } from '@/types/types';
import { PlusIcon } from 'lucide-react';

export const NotesModal = ({
  setShowForm,
  showForm,
}: {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  showForm: boolean;
}) => {
  const [notes, setNotes] = useState<NotesAccordion[]>([]);
  const form = useForm<z.infer<typeof addNotesSchema>>({
    resolver: zodResolver(addNotesSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const boardContext = useBoard();
  if (!boardContext) {
    throw new Error('BoardContext is null');
  }

  const handleSubmitForm = async ({ title, description }: z.infer<typeof addNotesSchema>) => {
    setShowForm(!showForm);

    const { data } = await supabase.from('accordion-list').insert([{ title, description }]);

    if (data) {
      setNotes([...notes, ...data]);
    }
  };

  return (
    <>
      <Dialog>
        <DialogOverlay onClick={() => setShowForm(!showForm)} />
        <DialogTrigger asChild className="w-full">
          <Button
            variant="secondary"
            className="px-5 flex justify-end items-center mt-0 space-y-0"
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
                      name="title"
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
