"use client";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useToast } from "./ui/useToast";
import { Button, ButtonLoading } from "./ui/Button";
import { Forum } from "@prisma/client";

type EditTopicProps = {
  id: number;
  forumId: number;
  active: boolean;
  pinned: boolean;
};

interface ForumWithSubForums extends Forum {
  subForums: {
    id: number;
    title: string;
  }[];
}

type ForumList =
  | {
      id: number;
      title: string;
      forums: ForumWithSubForums[];
    }[]
  | [];

const FormSchema = z.object({
  forum: z.string({
    required_error: "Please select a forum.",
  }),
});

const EditTopicDropdown = ({ id, forumId, active, pinned }: EditTopicProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [forumsList, setForumsList] = useState<ForumList>([]);
  const [isForumsLoading, setIsForumsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const {
    watch,
    formState: { isSubmitting },
  } = form;
  const forumIdValue = watch("forum", forumId.toString());

  const patchTopicHandler = async (payload: {}) => {
    try {
      const res = await fetch(`/api/topic/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();

      if (json?.success) {
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const moveForumHandler = async () => {
    try {
      setIsForumsLoading(true);
      const res = await fetch("/api/category/all");

      const json = await res.json();

      setForumsList(json);
      setIsForumsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const submitMoveForumHandler = async (data: z.infer<typeof FormSchema>) => {
    const parsedForumId = parseInt(data.forum);

    if (parsedForumId === forumId) {
      return;
    }

    await patchTopicHandler({
      forumId: parsedForumId,
    });
  };

  const deleteTopicHandler = async () => {
    try {
      const res = await fetch(`/api/topic/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();

      if (json?.success) {
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center text-sm font-medium gap-1">
          <BiDotsVerticalRounded size={22} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <button
              type="button"
              onClick={() => patchTopicHandler({ active: !active })}
            >
              {active ? "Close" : "Open"}
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              type="button"
              onClick={() => patchTopicHandler({ pinned: !pinned })}
            >
              {pinned ? "Unpin" : "Pin"}
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DialogTrigger asChild>
              <button type="button" onClick={moveForumHandler}>
                Move forum
              </button>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button type="button" onClick={deleteTopicHandler}>
              Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select forum</DialogTitle>
          <DialogDescription>
            Check the forum you want to move the topic into.
            <br />
            Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitMoveForumHandler)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="forum"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger loading={isForumsLoading}>
                        <SelectValue placeholder="Select a forum" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!isForumsLoading &&
                        forumsList.map((category) => {
                          return (
                            <SelectGroup key={category.id}>
                              <SelectLabel>{category.title}</SelectLabel>
                              {category.forums.map((forum) => (
                                <div key={forum.id} className="pl-4">
                                  <SelectItem
                                    value={forum.id + ""}
                                    disabled={forum.id === forumId}
                                  >
                                    {forum.title}
                                  </SelectItem>
                                  <div className="pl-4">
                                    {forum.subForums.map((subForum) => (
                                      <SelectItem
                                        key={subForum.id}
                                        value={subForum.id + ""}
                                        disabled={subForum.id === forumId}
                                      >
                                        - {subForum.title}
                                      </SelectItem>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </SelectGroup>
                          );
                        })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {isSubmitting ? (
                <ButtonLoading>Saving...</ButtonLoading>
              ) : (
                <Button
                  type="submit"
                  disabled={parseInt(forumIdValue) === forumId}
                >
                  Save
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTopicDropdown;
