'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Question, Category } from '@/types/quiz'
import { quizApi } from '@/api/quiz'
import { QuestionForm } from './questions-form'

export function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  const handleCreate = async (data: Omit<Question, 'id'>) => {
    try {
      await quizApi.createQuestion(data)
      setIsAddingNew(false)
      loadQuestions(selectedCategory !== 'all' ? selectedCategory : undefined)
    } catch (error) {
      console.error('Failed to create question:', error)
    }
  }

  const handleUpdate = async (id: string, data: Partial<Question>) => {
    try {
      await quizApi.updateQuestion(id, data)
      setEditingQuestion(null)
      loadQuestions(selectedCategory !== 'all' ? selectedCategory : undefined)
    } catch (error) {
      console.error('Failed to update question:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return
    try {
      await quizApi.deleteQuestion(id)
      loadQuestions(selectedCategory !== 'all' ? selectedCategory : undefined)
    } catch (error) {
      console.error('Failed to delete question:', error)
    }
  }

  useEffect(() => {
    loadCategories()
    loadQuestions()
  }, [])

  useEffect(() => {
    loadQuestions(selectedCategory !== 'all' ? selectedCategory : undefined)
  }, [selectedCategory])

  const loadCategories = async () => {
    try {
      const data = await quizApi.getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const loadQuestions = async (categoryId?: string) => {
    try {
      const data = await quizApi.getQuestions(categoryId)
      setQuestions(data)
    } catch (error) {
      console.error('Failed to load questions:', error)
    }
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Questions</h2>
        <div className="flex space-x-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setIsAddingNew(true)}>Add Question</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {questions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{question.question}</h3>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditingQuestion(question)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(question.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {question.answers.map((answer, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded ${
                      index === question.correctAnswer
                        ? 'bg-green-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    {answer}
                  </div>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Category: {question.category?.name}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {(isAddingNew || editingQuestion) && (
        <Card className="mt-4">
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {editingQuestion ? 'Edit Question' : 'Add New Question'}
            </h3>
          </CardHeader>
          <CardContent>
            <QuestionForm
              initialData={editingQuestion || undefined}
              categories={categories}
              onSubmit={(data) =>
                editingQuestion
                  ? handleUpdate(editingQuestion.id, data)
                  : handleCreate(data)
              }
              onCancel={() => {
                setEditingQuestion(null)
                setIsAddingNew(false)
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
