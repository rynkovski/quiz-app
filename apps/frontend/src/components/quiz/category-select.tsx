import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Category {
  id: string
  name: string
  description: string
}

export function CategorySelect({ 
  categories, 
  onSelect,
  loading
}: { 
  categories: Category[]
  onSelect: (categoryId: string) => void 
  loading: boolean
}) {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Card key={category.id} className="hover:shadow-lg transition-shadow flex flex-col justify-between">
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{category.description}</p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => onSelect(category.id)}
            >
              Rozpocznij Quiz
            </Button>
 
        </CardFooter>
        </Card>
      ))}
    </div>
  )
}