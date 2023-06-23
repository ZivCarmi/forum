import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("1234", 12);
  const ziv = await prisma.user.upsert({
    where: { email: "ziv@admin.com" },
    update: {},
    create: {
      email: "ziv@admin.com",
      password: password,
      displayName: "Ziv",
      role: "ADMIN",
    },
  });
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      password: password,
      displayName: "Alice",
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      password: password,
      displayName: "Bob",
    },
  });
  const category1 = await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "General Discussions",
      forums: {
        create: [
          {
            title: "The Talkative Lounge",
            description:
              "A vibrant space for engaging discussions, friendly banter, and sharing thoughts on a wide range of topics.",
            topics: {
              create: [
                {
                  title:
                    "The Benefits of Regular Exercise: Tips and Motivation!",
                  authorId: alice.id,
                  hot: true,
                  pinned: true,
                  comments: {
                    create: [
                      {
                        content:
                          "Hey everyone! I wanted to share my personal experience with regular exercise and how it has positively impacted my life. Over the past year, I've been committed to a consistent workout routine, and the benefits have been amazing. Not only have I noticed physical changes like increased strength and endurance, but my mood and energy levels have improved as well. If anyone needs tips or motivation to get started, feel free to ask!",
                        userId: alice.id,
                        updatedAt: new Date(new Date().getTime() + 30 * 60000),
                        topicInitiator: true,
                      },
                      {
                        content: "Hi this is bob, and my comment is edited",
                        userId: bob.id,
                        updatedAt: new Date(new Date().getTime() + 60 * 60000),
                      },
                    ],
                  },
                },
                {
                  title:
                    "Delicious and Healthy Recipes for Quick Weeknight Dinners",
                  authorId: bob.id,
                  active: false,
                  comments: {
                    create: [
                      {
                        content:
                          "Hi foodies! I recently discovered a fantastic recipe for a quick and healthy weeknight dinner that I just have to share. It's a mouthwatering stir-fry with fresh veggies and lean protein, and it takes less than 30 minutes to prepare. The best part is that you can easily customize it with your favorite ingredients. If you're interested, let me know, and I'll be happy to share the recipe!",
                        userId: bob.id,
                        topicInitiator: true,
                      },
                      {
                        content: "HI this is alice",
                        userId: alice.id,
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: "Ask Me Anything",
          },
        ],
      },
    },
  });
  const category2 = await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Introductions and Welcomes",
      forums: {
        create: [
          {
            title: "Fit and Fabulous",
            description:
              "Join health-conscious individuals in discussions about fitness routines, healthy lifestyle choices, and overall well-being, inspiring and motivating each other.",
          },
          {
            title: "The Informative Gazette",
            description:
              "Stay informed with the latest news, updates, and insightful discussions on various subjects, making this forum a reliable source of information.",
            allowNewTopics: false,
            subForums: {
              create: [
                {
                  title: "The Talkative Lounge",
                  description:
                    "A vibrant space for engaging discussions, friendly banter, and sharing thoughts on a wide range of topics.",
                  topics: {
                    create: [
                      {
                        title:
                          "Travel Tales: Share Your Best Vacation Stories and Hidden Gems",
                        authorId: bob.id,
                        comments: {
                          create: [
                            {
                              content:
                                "Greetings, fellow travelers! I recently returned from a breathtaking trip to Iceland, and I'm still in awe of the natural beauty I witnessed. From the stunning waterfalls to the enchanting Northern Lights, Iceland truly exceeded my expectations. If anyone is planning a visit or wants to hear more about my adventures, feel free to ask. I'm also eager to hear your best vacation stories and any hidden gems you've discovered during your travels!",
                              userId: bob.id,
                              topicInitiator: true,
                            },
                            {
                              content: "How are you bob?",
                              userId: alice.id,
                            },
                            {
                              content: "I'm good how are you?",
                              userId: bob.id,
                            },
                            {
                              content: "Very good!",
                              userId: alice.id,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: "Fit and Fabulous",
                  description:
                    "Join health-conscious individuals in discussions about fitness routines, healthy lifestyle choices, and overall well-being, inspiring and motivating each other.",
                },
              ],
            },
          },
          {
            title: "Tech Gurus' Corner",
            topics: {
              create: [
                {
                  title:
                    "Travel Tales: Share Your Best Vacation Stories and Hidden Gems",
                  authorId: bob.id,
                  hot: true,
                  active: false,
                  pinned: true,
                  comments: {
                    create: [
                      {
                        content:
                          "Greetings, fellow travelers! I recently returned from a breathtaking trip to Iceland, and I'm still in awe of the natural beauty I witnessed. From the stunning waterfalls to the enchanting Northern Lights, Iceland truly exceeded my expectations. If anyone is planning a visit or wants to hear more about my adventures, feel free to ask. I'm also eager to hear your best vacation stories and any hidden gems you've discovered during your travels!",
                        userId: bob.id,
                        topicInitiator: true,
                      },
                      {
                        content: "How are you bob?",
                        userId: alice.id,
                      },
                      {
                        content: "I'm good how are you?",
                        userId: bob.id,
                      },
                      {
                        content: "Very good!",
                        userId: alice.id,
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: "Creative Expressions",
            description:
              "Showcase your artistic talents, discuss different art forms, and explore the realms of creativity alongside fellow artists and enthusiasts.",
          },
        ],
      },
    },
  });

  console.log({ ziv, alice, bob, category1, category2 });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
