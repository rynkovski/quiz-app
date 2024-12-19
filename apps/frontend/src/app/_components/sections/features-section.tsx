import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'

type Props = {
  icon: React.ReactNode
  title: string
  description: string
}

export default function FeaturesSection(props: { features: Props[] }) {
  const { features } = props
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Quiz App?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="dark:bg-gray-700 flex flex-col items-center justify-center text-center"
            >
              <CardHeader className="items-center">
                <div className="rounded-lg bg-indigo-100 dark:bg-indigo-900 p-3 w-fit mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
