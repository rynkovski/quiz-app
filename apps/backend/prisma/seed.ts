// apps/backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Stwórz kategorie
  const history = await prisma.category.create({
    data: {
      name: 'Historia',
      description: 'Pytania z historii światowej i Polski',
    },
  });

  const geography = await prisma.category.create({
    data: {
      name: 'Geografia',
      description: 'Pytania o krajach i kontynentach',
    },
  });

  // Dodaj pytania
  await prisma.question.createMany({
    data: [
      {
        question: 'W którym roku rozpoczęła się II wojna światowa?',
        answers: ['1938', '1939', '1940', '1941'],
        correctAnswer: 1,
        categoryId: history.id,
      },
      {
        question: 'Kto był pierwszym królem Polski?',
        answers: [
          'Mieszko I',
          'Bolesław Chrobry',
          'Kazimierz Wielki',
          'Władysław Jagiełło',
        ],
        correctAnswer: 1,
        categoryId: history.id,
      },
      {
        question: 'Która rzeka jest najdłuższa na świecie?',
        answers: ['Nil', 'Amazonka', 'Missisipi', 'Jangcy'],
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
