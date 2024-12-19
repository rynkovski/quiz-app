import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';

import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let prisma: PrismaService;

  const mockPrismaService = {
    category: {
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
        CategoryService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const expectedCategories = [
        { id: '1', name: 'History', description: 'History questions' },
        { id: '2', name: 'Science', description: 'Science questions' },
      ];

      mockPrismaService.category.findMany.mockResolvedValue(expectedCategories);

      const result = await service.findAll();
      expect(result).toEqual(expectedCategories);
      expect(prisma.category.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single category', async () => {
      const expectedCategory = {
        id: '1',
        name: 'History',
        description: 'History questions',
      };

      mockPrismaService.category.findUnique.mockResolvedValue(expectedCategory);

      const result = await service.findOne('1');
      expect(result).toEqual(expectedCategory);
      expect(prisma.category.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: {
          questions: true,
          _count: {
            select: { questions: true },
          },
        },
      });
    });

    it('should throw NotFoundException when category not found', async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const categoryData = {
        name: 'New Category',
        description: 'New Description',
      };

      const expectedCategory = {
        id: '1',
        ...categoryData,
      };

      mockPrismaService.category.create.mockResolvedValue(expectedCategory);

      const result = await service.create(categoryData);
      expect(result).toEqual(expectedCategory);
      expect(prisma.category.create).toHaveBeenCalledWith({
        data: categoryData,
      });
    });
  });
});
