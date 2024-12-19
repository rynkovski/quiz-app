'use client'
import { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Category } from '@/types/quiz'
import { quizApi } from '@/api/quiz'
import { CategoryForm } from './category-form'
import { Pencil, Plus, Trash2 } from 'lucide-react'

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const data = await quizApi.getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const handleCreate = async (data: { name: string; description: string }) => {
    try {
      await quizApi.createCategory(data)
      loadCategories()
    } catch (error) {
      console.error('Failed to create category:', error)
    }
  }

  const handleUpdate = async (
    id: string,
    data: { name: string; description: string }
  ) => {
    try {
      await quizApi.updateCategory(id, data)
      setEditingCategory(null)
      loadCategories()
    } catch (error) {
      console.error('Failed to update category:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    try {
      await quizApi.deleteCategory(id)
      loadCategories()
    } catch (error) {
      console.error('Failed to delete category:', error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Category</SheetTitle>
            </SheetHeader>
            <CategoryForm
              onSubmit={handleCreate}
              onCancel={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="hover:shadow-lg transition-shadow dark:bg-gray-800"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="grid gap-1">
                <CardTitle className="text-indigo-600 dark:text-indigo-400">
                  {category.name}
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  {category.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground dark:text-gray-400">
                Questions: {category._count?.questions ?? 0}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-indigo-50 dark:hover:bg-indigo-900"
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Category</SheetTitle>
                  </SheetHeader>
                  <CategoryForm
                    initialData={category}
                    onSubmit={(data) => {
                      if (!editingCategory) return
                      handleUpdate(editingCategory.id, data)
                    }}
                    onCancel={() => setEditingCategory(null)}
                  />
                </SheetContent>
              </Sheet>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(category.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
