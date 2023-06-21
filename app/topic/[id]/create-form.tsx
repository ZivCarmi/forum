"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button, ButtonLoading } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/Form";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { AlertCircle } from "lucide-react";
import { EditorState } from "draft-js";
import WYSIWYG2 from "@/components/WYSIWYG2";
import { validateEditor } from "@/lib/client-utils";

export const formSchema = z.object({
  message: z.instanceof(EditorState),
  follow: z.boolean(),
});

const NewCommentForm = ({ isFollowing }: { isFollowing: boolean }) => {
  const router = useRouter();
  const { id: topicId } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: EditorState.createEmpty(),
      follow: isFollowing,
    },
  });
  const {
    formState: { errors, isSubmitting },
  } = form;

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    const { value, error } = validateEditor(values.message);

    if (error) {
      return form.setError("message", { message: "Message is required" });
    }

    const data = {
      topicId,
      follow: values.follow,
      message: value,
    };

    try {
      const res = await fetch("/api/comment/new", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        form.resetField("message");
        router.refresh();
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
        <WYSIWYG2 control={form.control} name="message" />
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
export default NewCommentForm;
