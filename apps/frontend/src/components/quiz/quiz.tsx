
import { useQuiz } from '@/hooks/useQuiz'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CategorySelect } from './category-select'
import { QuizQuestion } from './quiz-question'
import { QuizResults } from './quiz-results'

export function Quiz() {
  const {
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
  } = useQuiz()

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (state === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {state === 'category' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Wybierz kategorię</h2>
          <CategorySelect 
            categories={categories} 
            onSelect={handleCategorySelect}
            loading={loading} 
          />
        </div>
      )}

      {state === 'question' && questions.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Quiz</h2>
          <QuizQuestion
            question={questions[currentQuestion]}
            totalQuestions={questions.length}
            currentQuestion={currentQuestion + 1}
            onAnswer={handleAnswer}
            onTimeUp={handleTimeUp}
            timeLeft={30}
          />
        </div>
      )}

      {state === 'results' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Wyniki</h2>
          <QuizResults
            results={{
              score,
              totalQuestions: questions.length,
              timeSpent,
              correctAnswers
            }}
            onRestart={handleRestart}
            onHome={handleRestart}
          />
        </div>
      )}
    </div>
  )
}