import { Metadata } from "next";

import Container from "@/components/Container";
import PageTitle from "@/components/PageTitle";
import CategoryList from "@/components/CategoryList";
import { prisma } from "@/lib/prisma";
import getCategory from "@/lib/getCategory";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const forumData: Promise<{ title: string }> = getCategory(id);
  const forum = await forumData;

  return {
    title: forum.title,
  };
}

export const dynamic = "force-dynamic";

const Category = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await prisma.category.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      forums: {
        include: {
          subForums: {
            select: {
              id: true,
              title: true,
            },
          },
          _count: {
            select: {
              topics: true,
            },
          },
        },
      },
    },
  });

  return (
    <Container>
      <div className="mb-5">
        <PageTitle title={data?.title} />
      </div>
      <CategoryList
        id={id}
        title="Forums"
        forums={data?.forums}
        expandable={false}
        titleAsLink={false}
      />
    </Container>
  );
};

export default Category;
