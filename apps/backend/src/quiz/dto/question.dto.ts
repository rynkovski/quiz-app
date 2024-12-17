export class QuestionResponseDto {
  id: string;
  categoryId: string;
  question: string;
  answers: string[];
  correctAnswer?: number;
}
