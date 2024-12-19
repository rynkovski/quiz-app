import { Button } from '@/components/ui/button'

export default function CtaSection() {
  return (
    <section className="py-20 bg-indigo-600 dark:bg-indigo-800">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Test Your Knowledge?
        </h2>
        <p className="text-xl text-indigo-100 mb-8">
          Join thousands of users who are already expanding their horizons with
          our quizzes.
        </p>
        <Button size="lg" variant="secondary">
          Get Started Now
        </Button>
      </div>
    </section>
  )
}
