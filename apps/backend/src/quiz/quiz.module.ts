// apps/backend/src/quiz/quiz.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { CategoryController } from './category/category.controller';
import { QuestionController } from './question/question.controller';
import { CategoryService } from './category/category.service';
import { QuestionService } from './question/question.service';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController, QuestionController, QuizController],
  providers: [CategoryService, QuestionService, QuizService],
})
export class QuizModule {}
