"use client";

import { useContext } from "react";

import CategoryList from "@/components/CategoryList";
import Container from "@/components/Container";
import PageTitle from "@/components/PageTitle";
import { ForumContext } from "@/store/forums-context";

const Forum = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { forums } = useContext(ForumContext);
  const relatedForums = forums.filter((forum) => id === forum.categoryId);

  return (
    <Container>
      <PageTitle title="Current Forum" />
      {/* <CategoryList category={}/> */}
    </Container>
  );
};

export default Forum;
