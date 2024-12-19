import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
        <div className="flex justify-center flex-col items-center text-center lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
            Challenge Your Mind with Our Interactive Quizzes
          </h1>
          <p className="text-lg text-muted-foreground dark:text-gray-400 mb-8">
            Explore a world of knowledge, test your skills, and learn something
            new every day with our engaging quiz platform.
          </p>
          <Link href="/quiz">
            <Button
              size="lg"
              className="bg-indigo-600 font-bold hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              <Play className="mr-2 h-5 w-5 " /> Start a Quiz
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
