/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const categories = [
    'History',
    'Food',
    'Pets',
    'Health',
    'Fashion',
    'Exercise',
    'Others',
  ];

  await prisma.category.createMany({
    data: categories.map((name) => ({ name })),
  });

  const user = await prisma.user.create({
    data: {
      username: 'hello',
      avatarUrl:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  });

  const category = await prisma.category.findFirst({
    where: { name: 'History' },
  });

  if (!category) {
    throw new Error('Category "History" not found!');
  }

  const post = await prisma.post.create({
    data: {
      title: 'The Beginning of the End of the World',
      content:
        'The afterlife sitcom The Good Place comes to its culmination, the show’s two protagonists, Eleanor and Chidi, contemplate their future...',
      userId: user.id,
      categoryId: category.id,
    },
  });

  const commentUsers = ['Wittawat98', 'Hawaii51', 'Helo_re', 'Azc123'];

  for (const username of commentUsers) {
    const commentUser = await prisma.user.create({
      data: {
        username,
        avatarUrl: 'https://via.placeholder.com/150',
      },
    });

    await prisma.comment.create({
      data: {
        content:
          'Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet...',
        postId: post.id,
        userId: commentUser.id,
      },
    });
  }
}

main()
  .then(() => {
    console.log('Seed completed successfully!');
  })
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
