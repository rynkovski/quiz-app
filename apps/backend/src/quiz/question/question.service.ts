import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async findAll(categoryId?: string) {
    return this.prisma.question.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        category: true,
        quizResults: {
          select: {
            isCorrect: true,
            createdAt: true,
          },
        },
      },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }

  async create(data: {
    question: string;
    answers: string[];
    correctAnswer: number;
    categoryId: string;
  }) {
    return this.prisma.question.create({
      data,
      include: {
        category: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      question?: string;
      answers?: string[];
      correctAnswer?: number;
      categoryId?: string;
    },
  ) {
    try {
      return await this.prisma.question.update({
        where: { id },
        data,
        include: {
          category: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.question.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
  }
}
