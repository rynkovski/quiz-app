'use client'
import { useQuiz } from '@/hooks/useQuiz'
import { CategorySelect } from './category-select'
import { QuizQuestion } from './quiz-question'
import { QuizResults } from './quiz-results'

export function Quiz() {
  const {
    state,
    currentQuestion,
    categories,
    questions,
    score,
    timeSpent,
    correctAnswers,
    handleCategorySelect,
    handleAnswer,
    handleTimeUp,
    handleRestart,
  } = useQuiz()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {state === 'category' && (
        <CategorySelect
          loading={categories.length === 0}
          categories={categories}
          onSelect={handleCategorySelect}
        />
      )}

      {state === 'question' && questions.length > 0 && (
        <QuizQuestion
          question={questions[currentQuestion]}
          totalQuestions={questions.length}
          currentQuestion={currentQuestion + 1}
          onAnswer={handleAnswer}
          onTimeUp={handleTimeUp}
          timeLeft={30}
        />
      )}

      {state === 'results' && (
        <QuizResults
          results={{
            score,
            totalQuestions: questions.length,
            timeSpent,
            correctAnswers,
          }}
          onRestart={handleRestart}
          onHome={handleRestart}
        />
      )}
    </div>
  )
}
