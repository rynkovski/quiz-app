import { ApiProperty } from '@nestjs/swagger';

export class QuestionResponseDto {
  @ApiProperty({ example: '1', description: 'Unikalny identyfikator pytania' })
  id: string;

  @ApiProperty({
    example: 'Kto był pierwszym królem Polski?',
    description: 'Treść pytania',
  })
  question: string;

  @ApiProperty({
    example: ['Mieszko I', 'Bolesław Chrobry'],
    description: 'Lista możliwych odpowiedzi',
  })
  answers: string[];

  @ApiProperty({ example: '1', description: 'ID kategorii' })
  categoryId: string;
}

export class CheckAnswerDto {
  @ApiProperty({ example: '1', description: 'ID pytania' })
  questionId: string;

  @ApiProperty({
    example: 0,
    description: 'Indeks wybranej odpowiedzi (0-based)',
  })
  answer: number;
}
