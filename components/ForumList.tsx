import { prisma } from "@/lib/prisma";
import CategoryList from "./CategoryList";

const ForumList = async () => {
  const categories = await prisma.category.findMany({
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

  return categories.map((cat) => (
    <CategoryList
      key={cat.id}
      title={cat.title}
      id={cat.id}
      forums={cat.forums}
    />
  ));
};
export default ForumList;
