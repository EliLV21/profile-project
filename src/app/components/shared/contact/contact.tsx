import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { addFeedbackSchema } from '@/schema';
import supabase from '@/supabaseClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const ContactMe = ({
  setShowForm,
  showForm,
}: {
  setShowForm: Dispatch<React.SetStateAction<boolean>>;
  showForm: boolean;
}) => {
  const handleSubmitForm = async ({ name, email, feedback }: z.infer<typeof addFeedbackSchema>) => {
    setShowForm(!showForm);
    const { data, error } = await supabase.from('contact').insert([{ name, email, feedback }]);
    console.log(error);
    if (data) {
      console.log('Feedback sent!');
    }
  };

  const form = useForm<z.infer<typeof addFeedbackSchema>>({
    resolver: zodResolver(addFeedbackSchema),
    defaultValues: {
      name: '',
      email: '',
      feedback: '',
    },
  });

  return (
    <Dialog>
      <DialogOverlay onClick={() => setShowForm(!showForm)} />
      <DialogTrigger asChild>
        <Button variant="outline">Contact | Feedback</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thanks for your feedback!</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitForm)}>
            <div className="grid gap-4 py-4">
              <div className="grid items-center gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormMessage className="w-full" />
                      <FormControl>
                        <Input id="name" className="col-span-3" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormMessage className="w-full" />
                      <FormControl>
                        <Input id="email" className="col-span-3" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center gap-4">
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feedback</FormLabel>
                      <FormMessage className="w-full" />
                      <FormControl>
                        <Textarea id="feedback" className="col-span-3" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Send</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
