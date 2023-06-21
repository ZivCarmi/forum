import Container from "@/components/Container";
import ProfileFeed from "@/app/profile/[name]/ProfileFeed";
import { prisma } from "@/lib/prisma";

const Profile = async ({ params }: { params: { name: string } }) => {
  const { name } = params;

  const data = await prisma.user.findFirst({
    where: {
      displayName: name,
    },
    select: {
      createdAt: true,
      comments: {
        where: {
          topicInitiator: {
            not: true,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        select: {
          id: true,
          content: true,
          createdAt: true,
          topic: {
            select: {
              id: true,
              title: true,
              _count: {
                select: {
                  comments: true,
                },
              },
              forum: {
                select: {
                  id: true,
                  title: true,
                },
              },
              author: {
                select: {
                  displayName: true,
                },
              },
            },
          },
        },
      },
      topics: {
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        select: {
          id: true,
          title: true,
          createdAt: true,
          comments: {
            where: {
              topicInitiator: true,
            },
            select: {
              content: true,
              topicInitiator: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
          forum: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
      _count: {
        select: {
          comments: true,
          topics: true,
        },
      },
    },
  });

  const month = data?.createdAt.toLocaleString("default", { month: "long" });

  return (
    <Container>
      <div className="mb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {name}
        </h1>
        <div className="mt-1">ROLE</div>
      </div>
      <div className="flat px-10 py-3 flex gap-8">
        <div className="[&:not(:last-child)]:border-r border-neutral-300 dark:border-neutral-700 [&:not(:last-child)]:pr-8">
          <span className="text-xs text-muted-foreground">TOPICS</span>
          <div className="text-sm font-medium leading-none mt-1">
            {data?._count.topics}
          </div>
        </div>
        <div className="[&:not(:last-child)]:border-r border-neutral-300 dark:border-neutral-700 [&:not(:last-child)]:pr-8">
          <span className="text-xs text-muted-foreground">POSTS</span>
          <div className="text-sm font-medium leading-none mt-1">
            {data?._count.comments}
          </div>
        </div>
        <div className="[&:not(:last-child)]:border-r border-neutral-300 dark:border-neutral-700 [&:not(:last-child)]:pr-8">
          <span className="text-xs text-muted-foreground">JOINED</span>
          <div className="text-sm font-medium leading-none mt-1">
            {month + " "}
            {data?.createdAt.getDay() + ", "}
            {data?.createdAt.getFullYear()}
          </div>
        </div>
      </div>
      <div>
        <div className="flat mt-4">
          <ProfileFeed
            data={{ comments: data?.comments, topics: data?.topics }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Profile;
