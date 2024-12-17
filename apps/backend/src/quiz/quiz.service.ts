// apps/backend/src/quiz/quiz.service.ts
import { Injectable } from '@nestjs/common';

import { Category } from './entities/category.entity';
import { QuestionResponseDto } from './dto/question.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async getCategories(): Promise<Category[]> {
    return this.prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getQuestionsByCategory(
    categoryId: string,
  ): Promise<QuestionResponseDto[]> {
    const questions = await this.prisma.question.findMany({
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

    return questions;
  }

  async checkAnswer(questionId: string, answer: number) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });

    const isCorrect = question.correctAnswer === answer;

    // Zapisz wynik
    await this.prisma.quizResult.create({
      data: {
        questionId,
        answer,
        isCorrect,
        score: isCorrect ? 100 : 0,
        timeSpent: 30, // możemy później dodać rzeczywisty czas
        playerName: 'Anonymous', // możemy później dodać system użytkowników
      },
    });

    return isCorrect;
  }

  async getLeaderboard() {
    const results = await this.prisma.quizResult.findMany({
      where: {
        isCorrect: true,
      },
      orderBy: {
        score: 'desc',
      },
      take: 10,
      include: {
        question: {
          include: {
            category: true,
          },
        },
      },
    });

    return results;
  }
}
