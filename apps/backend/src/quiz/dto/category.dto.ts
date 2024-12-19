import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'History', description: 'Category name' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'Questions about history',
    description: 'Category description',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(200)
  description: string;
}

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'History',
    description: 'Category name',
    required: false,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @ApiProperty({
    example: 'Questions about history',
    description: 'Category description',
    required: false,
  })
  @IsString()
  @MinLength(10)
  @MaxLength(200)
  description?: string;
}

export class CategoryResponseDto {
  @ApiProperty({ example: '1', description: 'Category ID' })
  id: string;

  @ApiProperty({ example: 'History', description: 'Category name' })
  name: string;

  @ApiProperty({
    example: 'Questions about history',
    description: 'Category description',
  })
  description: string;

  @ApiProperty({
    example: { questions: 5 },
    description: 'Number of questions in the category',
  })
  _count?: {
    questions: number;
  };
}
