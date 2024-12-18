// apps/backend/src/quiz/controllers/question.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { QuestionService } from './question.service';


@ApiTags('questions')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  findAll(@Query('categoryId') categoryId?: string) {
    return this.questionService.findAll(categoryId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get question by id' })
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create question' })
  create(
    @Body()
    createQuestionDto: {
      question: string;
      answers: string[];
      correctAnswer: number;
      categoryId: string;
    },
  ) {
    return this.questionService.create(createQuestionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update question' })
  update(
    @Param('id') id: string,
    @Body()
    updateQuestionDto: {
      question?: string;
      answers?: string[];
      correctAnswer?: number;
      categoryId?: string;
    },
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete question' })
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
