
export interface Category {
  id: string;
  name: string;
  description: string;
  _count?: {
    questions: number;
  }
}

export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  categoryId: string;
  category?: Category;
}

export interface QuizResult {
  id: string;
  questionId: string;
  answer: number;
  isCorrect: boolean;
  score: number;
  timeSpent: number;
}