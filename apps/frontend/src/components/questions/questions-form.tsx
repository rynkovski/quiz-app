'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Question, Category } from '@/types/quiz'

interface QuestionFormProps {
  initialData?: Question
  categories: Category[]
  onSubmit: (data: Omit<Question, 'id'>) => void
  onCancel: () => void
}

export function QuestionForm({
  initialData,
  categories,
  onSubmit,
  onCancel,
}: QuestionFormProps) {
  const [formData, setFormData] = useState({
    question: initialData?.question || '',
    answers: initialData?.answers || ['', '', '', ''],
    correctAnswer: initialData?.correctAnswer || 0,
    categoryId: initialData?.categoryId || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Question</label>
        <Input
          value={formData.question}
          onChange={(e) =>
            setFormData({ ...formData, question: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Answers</label>
        {formData.answers.map((answer, index) => (
          <div key={index} className="flex space-x-2">
            <Input
              value={answer}
              onChange={(e) => {
                const newAnswers = [...formData.answers]
                newAnswers[index] = e.target.value
                setFormData({ ...formData, answers: newAnswers })
              }}
              placeholder={`Answer ${index + 1}`}
              required
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormData({ ...formData, correctAnswer: index })}
              className={formData.correctAnswer === index ? 'bg-green-100' : ''}
            >
              Correct
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Select
          value={formData.categoryId}
          onValueChange={(value) =>
            setFormData({ ...formData, categoryId: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-2">
        <Button type="submit">{initialData ? 'Update' : 'Create'}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
