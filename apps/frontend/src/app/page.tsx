// apps/frontend/src/app/page.tsx
'use client'

import { CategoryList } from '@/components/categories/category-list'
import { Quiz } from '@/components/quiz/quiz'
import { useState } from 'react'



export default function Home() {
  const [mode, setMode] = useState<'manage' | 'quiz'>('quiz')

  return (
    <main className="container mx-auto p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Quiz App</h1>
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              mode === 'manage' ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
            onClick={() => setMode('manage')}
          >
            Manage Categories
          </button>
          <button
            className={`px-4 py-2 rounded ${
              mode === 'quiz' ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
            onClick={() => setMode('quiz')}
          >
            Take Quiz
          </button>
        </div>
      </div>

      {mode === 'manage' ? (
        <CategoryList />
      ) : (
        <Quiz />
      )}
    </main>
  )
}