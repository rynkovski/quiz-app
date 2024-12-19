'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface Question {
  id: string
  question: string
  answers: string[]
  correctAnswer?: number
}

export function QuizQuestion({
  question,
  totalQuestions,
  currentQuestion,
  onAnswer,
  onTimeUp,
  timeLeft: initialTimeLeft = 30,
}: {
  question: Question
  totalQuestions: number
  currentQuestion: number
  onAnswer: (answerIndex: number) => void
  onTimeUp: () => void
  timeLeft?: number
}) {
  const [selected, setSelected] = useState<number>(-1)
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft)
  const progress = (currentQuestion / totalQuestions) * 100

  useEffect(() => {
    setTimeLeft(initialTimeLeft)
    setSelected(-1)

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [question.id, initialTimeLeft, onTimeUp])

  const handleSubmit = () => {
    if (selected >= 0) {
      onAnswer(selected)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span className="text-sm font-medium">Time left: {timeLeft}s</span>
        </div>
        <Progress value={progress} className="mb-2" />
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          className="gap-4"
          value={selected.toString()}
          onValueChange={(value) => setSelected(parseInt(value))}
        >
          {question.answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
              <label
                htmlFor={`answer-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {answer}
              </label>
            </div>
          ))}
        </RadioGroup>
        <Button
          className="w-full mt-6"
          onClick={handleSubmit}
          disabled={selected < 0}
        >
          Next question
        </Button>
      </CardContent>
    </Card>
  )
}
