import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface QuizResults {
  score: number
  totalQuestions: number
  timeSpent: number
  correctAnswers: number
}

export function QuizResults({
  results,
  onRestart,
  onHome,
}: {
  results: QuizResults
  onRestart: () => void
  onHome: () => void
}) {
  const percentage = (results.correctAnswers / results.totalQuestions) * 100

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Score:</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-4xl font-bold">{percentage.toFixed(0)}%</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Correct answers:</span>
              <span className="font-medium">
                {results.correctAnswers}/{results.totalQuestions}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span className="font-medium">{results.timeSpent} seconds</span>
            </div>
            <div className="flex justify-between">
              <span>Points:</span>
              <span className="font-medium">{results.score}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Button className="w-full" onClick={onRestart}>
              Try again
            </Button>
            <Button className="w-full" variant="outline" onClick={onHome}>
              Go back
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
