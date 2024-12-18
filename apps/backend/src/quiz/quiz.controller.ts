import { Controller, Get, Param, Post, Body, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryResponseDto } from './dto/category.dto';
import { QuestionResponseDto } from './dto/question.dto';
import { QuizService } from './quiz.service';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @Get('categories')
  @ApiOperation({ summary: 'Pobierz wszystkie kategorie' })
  @ApiResponse({
    status: 200,
    description: 'Lista kategorii',
    type: [CategoryResponseDto],
  })
  getCategories() {
    return this.quizService.getCategories();
  }

  @Get('questions/:categoryId')
  @ApiOperation({ summary: 'Pobierz pytania dla danej kategorii' })
  @ApiResponse({
    status: 200,
    description: 'Lista pytań',
    type: [QuestionResponseDto],
  })
  getQuestions(@Param('categoryId') categoryId: string) {
    return this.quizService.getQuestionsByCategory(categoryId);
  }

  @Post('check-answer')
  @ApiOperation({ summary: 'Sprawdź odpowiedź' })
  @ApiResponse({
    status: 200,
    description: 'Wynik odpowiedzi',
    type: Boolean,
  })
  checkAnswer(
    @Body() body: { questionId: string; answer: number },
    @Request() req,
  ) {
    return this.quizService.checkAnswer(body.questionId, body.answer);
  }
}
