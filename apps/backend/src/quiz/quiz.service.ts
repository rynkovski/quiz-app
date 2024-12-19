import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async getCategories() {
    return this.prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getQuestionsByCategory(categoryId: string) {
    return this.prisma.question.findMany({
      where: {
        categoryId,
      },
      select: {
        id: true,
        question: true,
        answers: true,
        categoryId: true,
      },
    });
  }

  async checkAnswer(questionId: string, answer: number) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });

    const isCorrect = question.correctAnswer === answer;

    const quizResultData: Prisma.QuizResultCreateInput = {
      answer,
      isCorrect,
      score: isCorrect ? 100 : 0,
      timeSpent: 30,
      question: {
        connect: {
          id: questionId,
        },
      },
    };

    return this.prisma.quizResult.create({
      data: quizResultData,
    });
  }
}
