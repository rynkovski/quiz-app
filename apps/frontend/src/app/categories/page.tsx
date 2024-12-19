import { CategoryList } from '@/components/categories/category-list'

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      <div className="mx-auto max-w-7xl py-8">
        <CategoryList />
      </div>
    </main>
  )
}
