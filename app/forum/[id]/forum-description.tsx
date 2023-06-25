"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MdCheck, MdClose, MdEdit } from "react-icons/md";

import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/useToast";

const Description = ({ content }: { content: string }) => {
  const router = useRouter();
  const { id } = useParams();
  const [description, setDescription] = React.useState<string>(content);
  const [isEdit, setIsEdit] = useState(false);
  const { toast } = useToast();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (description === content) {
      setIsEdit(false);
      return;
    }

    try {
      const res = await fetch(`/api/forum/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          description,
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
        defaultValue={description}
        className="w-full"
        onChange={(e) => setDescription(e.target.value)}
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
      <p>{description}</p>
      <button type="button" onClick={() => setIsEdit(true)}>
        <MdEdit size={20} />
      </button>
    </div>
  );
};

export default Description;
