import { useState, useEffect } from 'react'
import { quizApi } from '@/api/quiz'

type QuizState = 'category' | 'loading' | 'question' | 'results'

export interface Category {
  id: string
  name: string
  description: string
}

export interface Question {
  id: string
  categoryId: string
  question: string
  answers: string[]
}

export const useQuiz = () => {
  const [state, setState] = useState<QuizState>('category')
  const [categories, setCategories] = useState<Category[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await quizApi.getCategories()
        setCategories(data)
      } catch (err) {
        setError('Failed to load category' + err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategorySelect = async (categoryId: string) => {
    try {
      setState('loading')
      const data = await quizApi.getQuestions(categoryId)
      setQuestions(data)
      setCurrentQuestion(0)
      setState('question')
    } catch (err) {
      setError('Failed to load questions' + err)
      setState('category')
    }
  }

  const handleAnswer = async (answerIndex: number) => {
    try {
      const isCorrect = await quizApi.checkAnswer(
        questions[currentQuestion].id,
        answerIndex
      )

      if (isCorrect) {
        setScore((prev) => prev + 100)
        setCorrectAnswers((prev) => prev + 1)
      }

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        setState('results')
      }
    } catch (error) {
      console.error('Error checking answer:', error)
      setError('Error checking answer' + error)
    }
  }

  const handleTimeUp = () => {
    setTimeSpent((prev) => prev + 30)
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setState('results')
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setTimeSpent(0)
    setCorrectAnswers(0)
    setQuestions([])
    setState('category')
  }

  return {
    state,
    currentQuestion,
    score,
    timeSpent,
    correctAnswers,
    categories,
    questions,
    error,
    loading,
    handleCategorySelect,
    handleAnswer,
    handleRestart,
    handleTimeUp,
  }
}
