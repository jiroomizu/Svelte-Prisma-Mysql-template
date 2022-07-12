// to seeding sample data
// run `npx prisma db seed` inside of `/api/`

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // making admin user
  const admin = await prisma.user.upsert({
    where: { email: "who@example.com" },
    update: {},
    create: {
      email: "who@example.com",
      name: "Admin",
    },
  });

  // create multiple tags
  const tags = await prisma.tag.createMany({
    data: [
      { name: "HTML/CSS" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "MySQL" },
      { name: "PHP" },
      { name: "GraphQL" },
      { name: "node.js" },
      { name: "React" },
      { name: "Svelte" },
      { name: "Prisma" },
      { name: "Apollo GraphQL" },
      { name: "express" },
      { name: "Linux" },
      { name: "CI/CD" },
    ],
  });

  // create multiple categories
  const categories = await prisma.category.createMany({
    data: [
      { name: "Design into Code" },
      { name: "Implementation" },
      { name: "System Planning" },
    ],
  });

  // create a post
  const post01 = await prisma.post.create({
    data: {
      title: "",
      link: "",
      content:
        "This is a sample post. Title can be also ommmited. It will change the presentation in app. HTML tags <i>included</i>, and it's sanitized by sanitaize-html library.",
      authorId: 1,
    },
  });

  // create a post
  const post02 = await prisma.post.create({
    data: {
      title: "Retail Webstore Project",
      link: "#",
      content:
        "This is a sample post. HTML tags <i>included</i>, and it's sanitized by sanitaize-html library.",
      authorId: 1,
      categories: {
        create: [
          {
            assignedBy: 1,
            category: {
              connect: {
                id: 1,
              },
            },
          },
          {
            assignedBy: 1,
            category: {
              connect: {
                id: 2,
              },
            },
          },
        ],
      },
      tags: {
        create: [
          {
            assignedBy: 1,
            tag: {
              connect: {
                id: 1,
              },
            },
          },
          {
            assignedBy: 1,
            tag: {
              connect: {
                id: 2,
              },
            },
          },
          {
            assignedBy: 1,
            tag: {
              connect: {
                id: 4,
              },
            },
          },
          {
            assignedBy: 1,
            tag: {
              connect: {
                id: 8,
              },
            },
          },
        ],
      },
    },
  });

  // create a post
  const post03 = await prisma.post.create({
    data: {
      title: "Cosmetics Branding Website",
      link: "",
      content:
        "This is a sample post. Title link can be ommited. HTML tags <i>included</i>, and it's sanitized by sanitaize-html library.",
      authorId: 1,
      categories: {
        create: [
          {
            assignedBy: 1,
            category: {
              connect: {
                id: 2,
              },
            },
          },
          {
            assignedBy: 1,
            category: {
              connect: {
                id: 3,
              },
            },
          },
        ],
      },
      tags: {
        create: [
          {
            assignedBy: 1,
            tag: {
              connect: {
                id: 5,
              },
            },
          },
          {
            assignedBy: 1,
            tag: {
              connect: {
                id: 7,
              },
            },
          },
          {
            assignedBy: 1,
            tag: {
              connect: {
                id: 9,
              },
            },
          },
        ],
      },
    },
  });

  // create a post
  const post04 = await prisma.post.create({
    data: {
      title: "Updating Legacy Internal System",
      link: "#",
      content:
        "This is a sample post. HTML tags <i>included</i>, and it's sanitized by sanitaize-html library.",
      authorId: 1,
      categories: {
        create: [
          {
            assignedBy: 1,
            category: {
              connect: {
                id: 2,
              },
            },
          },
          {
            assignedBy: 1,
            category: {
              connect: {
                id: 3,
              },
            },
          },
        ],
      },
      tags: {
        create: [
          {
            assignedBy: 1,
            tag: {
              connect: {
                id: 5,
              },
            },
          },
          {
            assignedBy: 1,
            tag: {
              connect: {
                id: 7,
              },
            },
          },
          {
            assignedBy: 1,
            tag: {
              connect: {
                id: 9,
              },
            },
          },
        ],
      },
    },
  });

  console.log({ admin, tags, categories, post01, post02, post03, post04 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
