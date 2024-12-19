import { Book, Globe2, MapPin, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Category {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  slug: string
}

const categories: Category[] = [
  {
    id: '1',
    title: 'Historia',
    description: 'Pytania z historii światowej i Polski',
    icon: <Book className="h-6 w-6" />,
    slug: 'historia',
  },
  {
    id: '2',
    title: 'Świat',
    description: 'wszystko i nic',
    icon: <Globe2 className="h-6 w-6" />,
    slug: 'swiat',
  },
  {
    id: '3',
    title: 'Geografia',
    description: 'Pytania o krajach',
    icon: <MapPin className="h-6 w-6" />,
    slug: 'geografia',
  },
]

export default function QuizCategories() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      <div className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Wybierz kategorię
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Select a category to start the quiz
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="hover:shadow-lg transition-shadow dark:bg-gray-800"
            >
              <CardHeader>
                <div className="rounded-lg bg-indigo-100 dark:bg-indigo-900 p-3 w-fit mb-4">
                  {category.icon}
                </div>
                <CardTitle className="text-xl">{category.title}</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                  size="lg"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Rozpocznij Quiz
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
