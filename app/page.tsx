"use client";

import { useContext } from "react";

import PageTitle from "@/components/PageTitle";
import Container from "@/components/Container";
import CategoryList from "@/components/CategoryList";
import { CategoryContext } from "@/store/category-context";

export default function Home() {
  const { categories } = useContext(CategoryContext);

  return (
    <Container>
      <div className="flex">
        <section className="grow">
          <div className="mb-5">
            <PageTitle title="Forums" />
          </div>
          <div className="grid gap-5">
            {categories.map((cat) => (
              <CategoryList key={cat.id} categoryId={cat.id} />
            ))}
          </div>
        </section>
        <div>aside</div>
      </div>
    </Container>
  );
}
