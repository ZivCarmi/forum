"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/Input";
import WYSIWYG from "@/components/WYSIWYG";
import { Button, ButtonLoading } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { AlertCircle } from "lucide-react";

export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  message: z.string().min(1, {
    message: "Message is required",
  }),
  follow: z.boolean().default(false),
});

const NewTopicForm = () => {
  const router = useRouter();
  const { id: forumId } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });
  const {
    formState: { errors, isSubmitting },
  } = form;

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    const data = {
      forumId,
      ...values,
    };

    console.log(data);

    try {
      const res = await fetch("/api/topic/new", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        router.push(`/topic/${json.topic.id}`);
      } else {
        form.setError("root", { message: json?.error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(submitHandler)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-2.5">
          <FormField
            control={form.control}
            name="message"
            render={() => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <WYSIWYG />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {errors.root && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.root.message}</AlertDescription>
          </Alert>
        )}
        <div className="flex justify-between items-center mt-6">
          <FormField
            control={form.control}
            name="follow"
            render={({ field }) => (
              <FormItem className="space-y-0 flex items-center gap-4">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>Follow topic</FormDescription>
              </FormItem>
            )}
          />
          {isSubmitting ? (
            <ButtonLoading>Submitting</ButtonLoading>
          ) : (
            <Button type="submit">Submit topic</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default NewTopicForm;
