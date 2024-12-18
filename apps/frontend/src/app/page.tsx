// apps/frontend/src/app/page.tsx
'use client'

import { useState } from 'react'


import { Button } from '@/components/ui/button'
import { CategoryList } from '@/components/categories/category-list'
import { QuestionList } from '@/components/questions/questions-list'
import { Quiz } from '@/components/quiz/quiz'

export default function Home() {
  const [mode, setMode] = useState<'categories' | 'questions' | 'quiz'>('categories')

  return (
    <main className="container mx-auto p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Quiz App</h1>
        <div className="flex justify-center space-x-4">
          <Button
            variant={mode === 'categories' ? 'default' : 'outline'}
            onClick={() => setMode('categories')}
          >
            Categories
          </Button>
          <Button
            variant={mode === 'questions' ? 'default' : 'outline'}
            onClick={() => setMode('questions')}
          >
            Questions
          </Button>
          <Button
            variant={mode === 'quiz' ? 'default' : 'outline'}
            onClick={() => setMode('quiz')}
          >
            Take Quiz
          </Button>
        </div>
      </div>

      {mode === 'categories' && <CategoryList />}
      {mode === 'questions' && <QuestionList />}
      {mode === 'quiz' && <Quiz/>}
    </main>
  )
}