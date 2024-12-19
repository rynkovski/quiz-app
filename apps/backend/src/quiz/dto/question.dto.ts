import {
  IsString,
  IsArray,
  IsNumber,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Min,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({
    example: 'What is the capital of Poland?',
    description: 'Question text',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  question: string;

  @ApiProperty({
    example: ['Warszawa', 'Krakow', 'Poznan', 'Wroclaw'],
    description: 'List of answers',
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(6)
  @IsString({ each: true })
  answers: string[];

  @ApiProperty({
    example: 0,
    description: 'Index of the correct answer (0-based)',
  })
  @IsNumber()
  @Min(0)
  correctAnswer: number;

  @ApiProperty({ example: '1', description: 'Category ID' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

export class UpdateQuestionDto {
  @ApiProperty({
    example: 'What is the capital of Poland?',
    description: 'Question text',
    required: false,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  question?: string;

  @ApiProperty({
    example: ['Warszawa', 'Krakow', 'Poznan', 'Wroclaw'],
    description: 'List of answers',
    required: false,
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(6)
  @IsString({ each: true })
  answers?: string[];

  @ApiProperty({
    example: 0,
    description: 'Index of the correct answer (0-based)',
    required: false,
  })
  @IsNumber()
  @Min(0)
  correctAnswer?: number;

  @ApiProperty({ example: '1', description: 'Category ID', required: false })
  @IsString()
  categoryId?: string;
}

export class QuestionResponseDto {
  @ApiProperty({ example: '1', description: 'Question ID' })
  id: string;

  @ApiProperty({
    example: 'What is the capital of Poland?',
    description: 'Question text',
  })
  question: string;

  @ApiProperty({
    example: ['Warszawa', 'Krakow', 'Poznan', 'Wroclaw'],
    description: 'List of answers',
  })
  answers: string[];

  @ApiProperty({ example: '1', description: 'Category ID' })
  categoryId: string;

  @ApiProperty({ required: false })
  category?: {
    id: string;
    name: string;
    description: string;
  };
}
