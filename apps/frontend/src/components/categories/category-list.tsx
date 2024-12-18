'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Category } from '@/types/quiz';
import { quizApi } from '@/api/quiz';
import { CategoryForm } from './category-form';


export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await quizApi.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleCreate = async (data: { name: string; description: string }) => {
    try {
      await quizApi.createCategory(data);
      setIsAddingNew(false);
      loadCategories();
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleUpdate = async (id: string, data: { name: string; description: string }) => {
    try {
      await quizApi.updateCategory(id, data);
      setEditingCategory(null);
      loadCategories();
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      await quizApi.deleteCategory(id);
      loadCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button onClick={() => setIsAddingNew(true)}>Add Category</Button>
      </div>

      {isAddingNew && (
        <Card>
          <CardHeader>Add New Category</CardHeader>
          <CardContent>
            <CategoryForm
              onSubmit={handleCreate}
              onCancel={() => setIsAddingNew(false)}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                Questions: {category._count?.questions ?? 0}
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setEditingCategory(category)}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingCategory && (
        <Card>
          <CardHeader>Edit Category</CardHeader>
          <CardContent>
            <CategoryForm
              initialData={editingCategory}
              onSubmit={(data) => handleUpdate(editingCategory.id, data)}
              onCancel={() => setEditingCategory(null)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}