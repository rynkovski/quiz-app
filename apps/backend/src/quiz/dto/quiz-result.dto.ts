import {
  IsNumber,
  IsString,
  IsBoolean,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizResultDto {
  @ApiProperty({ example: '1', description: 'Question ID' })
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({ example: 0, description: 'Index of the selected answer' })
  @IsNumber()
  @Min(0)
  answer: number;

  @ApiProperty({ example: true, description: 'Is the answer correct' })
  @IsBoolean()
  isCorrect: boolean;

  @ApiProperty({ example: 100, description: 'Score' })
  @IsNumber()
  @Min(0)
  score: number;

  @ApiProperty({
    example: 30,
    description: 'Time spent on the question (in seconds)',
  })
  @IsNumber()
  @Min(0)
  timeSpent: number;
}

export class QuizResultResponseDto {
  @ApiProperty({ example: '1', description: 'Score ID' })
  id: string;

  @ApiProperty({ example: '1', description: 'Question ID' })
  questionId: string;

  @ApiProperty({ example: 0, description: 'Index of the selected answer' })
  answer: number;

  @ApiProperty({ example: true, description: 'Is the answer correct' })
  isCorrect: boolean;

  @ApiProperty({ example: 100, description: 'Score' })
  score: number;

  @ApiProperty({
    example: 30,
    description: 'Time spent on the question (in seconds)',
  })
  timeSpent: number;

  @ApiProperty({
    example: '2024-01-01T12:00:00Z',
    description: 'Date and time of the result',
  })
  createdAt: Date;
}
