const API_URL = 'http://localhost:3001';

export const quizApi = {
  async getCategories() {
    const response = await fetch(`${API_URL}/quiz/categories`);
    return response.json();
  },

  async getQuestions(categoryId: string) {
    const response = await fetch(`${API_URL}/quiz/questions/${categoryId}`);
    return response.json();
  },

  async checkAnswer(questionId: string, answer: number) {
    const response = await fetch(`${API_URL}/quiz/check-answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questionId, answer }),
    });
    return response.json();
  },
};