import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';

import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

describe('QuestionService', () => {
  let service: QuestionService;
  let prisma: PrismaService;

  const mockPrismaService = {
    question: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all questions when no categoryId provided', async () => {
      const expectedQuestions = [
        { id: '1', question: 'Test?', answers: ['A', 'B'], correctAnswer: 0 },
        { id: '2', question: 'Test 2?', answers: ['C', 'D'], correctAnswer: 1 },
      ];

      mockPrismaService.question.findMany.mockResolvedValue(expectedQuestions);

      const result = await service.findAll();
      expect(result).toEqual(expectedQuestions);
      expect(prisma.question.findMany).toHaveBeenCalledWith({
        where: undefined,
        include: { category: true },
      });
    });

    it('should return filtered questions when categoryId provided', async () => {
      const categoryId = '1';
      const expectedQuestions = [
        { id: '1', question: 'Test?', answers: ['A', 'B'], correctAnswer: 0 },
      ];

      mockPrismaService.question.findMany.mockResolvedValue(expectedQuestions);

      const result = await service.findAll(categoryId);
      expect(result).toEqual(expectedQuestions);
      expect(prisma.question.findMany).toHaveBeenCalledWith({
        where: { categoryId },
        include: { category: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single question with its results', async () => {
      const expectedQuestion = {
        id: '1',
        question: 'Test?',
        answers: ['A', 'B'],
        correctAnswer: 0,
        quizResults: [],
      };

      mockPrismaService.question.findUnique.mockResolvedValue(expectedQuestion);

      const result = await service.findOne('1');
      expect(result).toEqual(expectedQuestion);
    });

    it('should throw NotFoundException when question not found', async () => {
      mockPrismaService.question.findUnique.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });
});
