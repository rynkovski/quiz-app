import { Button } from '@/components/ui/button'
import { Brain } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="flex h-14 max-w-7xl px-4 mx-auto items-center justify-between">
        <Link className="flex items-center space-x-2 font-bold" href="/">
          <Brain className="h-6 w-6 text-indigo-600" />
          <span>Quiz App</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 text-muted-foreground dark:text-gray-400"
            href="/categories"
          >
            Categories
          </Link>
          <Link
            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 text-muted-foreground dark:text-gray-400"
            href="/questions"
          >
            Questions
          </Link>
          <Button className='bg-indigo-600  hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"'>
            <Link href="/quiz">Take Quiz</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
