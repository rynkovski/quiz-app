const API_URL = 'http://localhost:3001';

export const quizApi = {

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

  async getCategories() {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  async createCategory(data: { name: string; description: string }) {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create category');
    return response.json();
  },

  async updateCategory(id: string, data: { name?: string; description?: string }) {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update category');
    return response.json();
  },

  async deleteCategory(id: string) {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete category');
    return response.json();
  },

  // Questions
  async getQuestions(categoryId?: string) {
    const url = categoryId 
      ? `${API_URL}/questions?categoryId=${categoryId}`
      : `${API_URL}/questions`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch questions');
    return response.json();
  },

  async createQuestion(data: {
    question: string;
    answers: string[];
    correctAnswer: number;
    categoryId: string;
  }) {
    const response = await fetch(`${API_URL}/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create question');
    return response.json();
  },

  async updateQuestion(id: string, data: {
    question?: string;
    answers?: string[];
    correctAnswer?: number;
    categoryId?: string;
  }) {
    const response = await fetch(`${API_URL}/questions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update question');
    return response.json();
  },

  async deleteQuestion(id: string) {
    const response = await fetch(`${API_URL}/questions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete question');
    return response.json();
  },
};