"use client";

import { useContext } from "react";

import Container from "@/components/Container";
import PageTitle from "@/components/PageTitle";
import { CategoryContext } from "@/store/category-context";
import CategoryList from "@/components/CategoryList";

const Category = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { categories } = useContext(CategoryContext);
  const category = categories.find((category) => id === category.id);

  return (
    <Container>
      <div className="mb-5">
        <PageTitle title={category!.title} />
      </div>

      <CategoryList categoryId={id} title="Forums" expandable={false} />
    </Container>
  );
};

export default Category;
