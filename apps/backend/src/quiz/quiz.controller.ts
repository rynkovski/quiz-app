import { Controller, Post, Body, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuizService } from './quiz.service';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('check-answer')
  @ApiOperation({ summary: 'Check answer' })
  @ApiResponse({
    status: 200,
    description: 'Result',
    type: Boolean,
  })
  checkAnswer(
    @Body() body: { questionId: string; answer: number },
    @Request() req,
  ) {
    return this.quizService.checkAnswer(body.questionId, body.answer);
  }
}
