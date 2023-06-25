"use client";

import { BiDotsVerticalRounded } from "react-icons/bi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/useToast";

type EditTopicProps = {
  id: number;
  pinned: boolean;
};

const EditTopicDropdown = ({ id, pinned }: EditTopicProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const pinHandler = async () => {
    try {
      const res = await fetch(`/api/topic/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          pinned: !pinned,
        }),
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
    // try {
    //   const res = await fetch(`/api/topic/${id}`, {
    //     method: "PATCH",
    //     body: JSON.stringify({
    //       forum: !pinned,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const json = await res.json();
    //   console.log(json);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center text-sm font-medium gap-1">
        <BiDotsVerticalRounded size={22} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button type="button" onClick={pinHandler}>
            {pinned ? "Unpin" : "Pin"} topic
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button type="button" onClick={moveForumHandler}>
            Move forum
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button type="button">Delete</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default EditTopicDropdown;
