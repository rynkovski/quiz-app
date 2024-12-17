import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('categories')
  getCategories() {
    return this.quizService.getCategories();
  }

  @Get('questions/:categoryId')
  getQuestions(@Param('categoryId') categoryId: string) {
    return this.quizService.getQuestionsByCategory(categoryId);
  }

  @Post('check-answer')
  checkAnswer(@Body() body: { questionId: string; answer: number }) {
    return this.quizService.checkAnswer(body.questionId, body.answer);
  }
}
