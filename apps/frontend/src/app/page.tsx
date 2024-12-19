import { Brain, Globe2, Rocket } from 'lucide-react'
import HeroSection from './_components/sections/hero-sections'
import CtaSection from './_components/sections/cta-section'
import FeaturesSection from './_components/sections/features-section'

const features = [
  {
    icon: <Brain className="h-6 w-6 text-indigo-600" />,
    title: 'Test Your Knowledge',
    description:
      'Challenge yourself with a wide range of topics and difficulty levels.',
  },
  {
    icon: <Rocket className="h-6 w-6 text-indigo-600" />,
    title: 'Learn and Improve',
    description:
      'Gain insights and expand your understanding with each quiz you take.',
  },
  {
    icon: <Globe2 className="h-6 w-6 text-indigo-600" />,
    title: 'Diverse Categories',
    description: 'Explore quizzes in history, geography, science, and more.',
  },
]

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection features={features} />
      <CtaSection />
    </main>
  )
}
