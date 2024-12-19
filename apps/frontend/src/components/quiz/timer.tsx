import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function Timer({
  duration,
  onTimeUp,
}: {
  duration: number
  onTimeUp: () => void
}) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const progress = (timeLeft / duration) * 100

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  return (
    <div className="space-y-2">
      {timeLeft <= 10 && (
        <Alert variant="destructive">
          <AlertDescription>
            Hurry up! Only {timeLeft} seconds left!
          </AlertDescription>
        </Alert>
      )}
      <Progress value={progress} />
    </div>
  )
}
