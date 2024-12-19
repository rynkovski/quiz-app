import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const history = await prisma.category.create({
    data: {
      name: 'History',
      description: 'World History',
    },
  });

  const geography = await prisma.category.create({
    data: {
      name: 'Geography',
      description: 'Questions about world geography',
    },
  });

  await prisma.question.createMany({
    data: [
      {
        question: 'What year was WW2?',
        answers: ['1938', '1939', '1940', '1941'],
        correctAnswer: 1,
        categoryId: history.id,
      },
      {
        question: 'What is the capital of France?',
        answers: ['Paris', 'London', 'Berlin', 'Rome'],
        correctAnswer: 0,
        categoryId: geography.id,
      },
      {
        question: 'What is the name of the longest river in the world?',
        answers: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
        correctAnswer: 0,
        categoryId: geography.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
