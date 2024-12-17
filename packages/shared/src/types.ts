
export type Question = {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  category: string;
}

export type Category = {
  id: string;
  name: string;
  description: string;
}

export type QuizResult = {
  id: string;
  playerName: string;
  score: number;
  category: string;
  timeSpent: number;
  createdAt: Date;
}

export type LeaderboardEntry = QuizResult & {
  position: number;
}