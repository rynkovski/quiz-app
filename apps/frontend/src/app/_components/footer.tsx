import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="flex justify-center items-center text-center text-muted-foreground dark:text-gray-400">
        <span>
          {' '}
          &copy; 2024{' '}
          <Link
            href="https://www.github.com/rynkovski"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:underline text-indigo-600"
          >
            rynkovski
          </Link>{' '}
        </span>
      </div>
    </footer>
  )
}
