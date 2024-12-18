import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    example: '1',
    description: 'Unikalny identyfikator kategorii',
  })
  id: string;

  @ApiProperty({ example: 'Historia', description: 'Nazwa kategorii' })
  name: string;

  @ApiProperty({
    example: 'Pytania z historii światowej',
    description: 'Opis kategorii',
  })
  description: string;
}
