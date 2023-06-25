"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MdCheck, MdClose, MdEdit } from "react-icons/md";

import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/useToast";
import PageTitle from "@/components/PageTitle";

const ForumTitle = ({ title }: { title: string }) => {
  const router = useRouter();
  const { id } = useParams();
  const [newTitle, setNewTitle] = React.useState<string>(title);
  const [isEdit, setIsEdit] = useState(false);
  const { toast } = useToast();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newTitle === title) {
      setIsEdit(false);
      return;
    }

    try {
      const res = await fetch(`/api/forum/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: newTitle,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();

      if (json.success) {
        setIsEdit(false);
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return isEdit ? (
    <form onSubmit={submitHandler} className="flex w-full gap-4">
      <Input
        type="text"
        defaultValue={newTitle}
        className="w-full"
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => setIsEdit(false)}>
          <MdClose size={22} />
        </button>
        <button type="submit">
          <MdCheck size={22} />
        </button>
      </div>
    </form>
  ) : (
    <div className="flex items-center gap-4">
      <PageTitle>{title}</PageTitle>
      <button type="button" onClick={() => setIsEdit(true)}>
        <MdEdit size={20} />
      </button>
    </div>
  );
};

export default ForumTitle;
