'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Quiz } from '@/components/quiz/quiz'


export default function Home() {
  const [isQuizStarted, setIsQuizStarted] = useState(false)

  return (
    <main className="container mx-auto p-4">
      {!isQuizStarted ? (
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-bold mb-4">Quiz App</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Sprawdź swoją wiedzę w różnych kategoriach! Wybierz kategorię i rozpocznij quiz.
          </p>
          <Button 
            size="lg"
            onClick={() => setIsQuizStarted(true)}
          >
            Rozpocznij Quiz
          </Button>
        </div>
      ) : (
        <Quiz />
      )}
    </main>
  )
}