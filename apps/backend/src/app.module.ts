import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [QuizModule, PrismaModule],
})
export class AppModule {}
