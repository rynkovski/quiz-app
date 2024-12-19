import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from 'prisma/prisma.service';

describe('QuizController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    await prisma.quizResult.deleteMany();
    await prisma.question.deleteMany();
    await prisma.category.deleteMany();
  });

  describe('/categories (GET)', () => {
    it('should return empty array when no categories', () => {
      return request(app.getHttpServer())
        .get('/categories')
        .expect(200)
        .expect([]);
    });

    it('should create and return categories', async () => {
      const category = await prisma.category.create({
        data: {
          name: 'History',
          description: 'History questions',
        },
      });

      return request(app.getHttpServer())
        .get('/categories')
        .expect(200)
        .expect([
          expect.objectContaining({
            id: category.id,
            name: 'History',
            description: 'History questions',
          }),
        ]);
    });
  });

  describe('/questions (POST)', () => {
    it('should create a new question', async () => {
      const category = await prisma.category.create({
        data: {
          name: 'History',
          description: 'History questions',
        },
      });

      const questionData = {
        question: 'What year was WW2?',
        answers: ['1939', '1940', '1941', '1942'],
        correctAnswer: 0,
        categoryId: category.id,
      };

      return request(app.getHttpServer())
        .post('/questions')
        .send(questionData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toMatchObject({
            question: questionData.question,
            answers: questionData.answers,
            correctAnswer: questionData.correctAnswer,
            categoryId: category.id,
          });
        });
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });
});
