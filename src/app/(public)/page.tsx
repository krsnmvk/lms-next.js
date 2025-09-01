import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookCopyIcon, CarIcon, LineChart, Users2Icon } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'Comprehensive Course',
    description:
      'Access a wide range of carefully curated courses designed by industry experts.',
    icon: BookCopyIcon,
  },
  {
    title: 'Interactive Learning',
    description:
      'Engage with interactive content, quizzes, and assignments to enhance your learning experience',
    icon: CarIcon,
  },
  {
    title: 'Progress Tracking',
    description:
      'Monitor your progress and archievements with detailed analytics and personalized dashboards',
    icon: LineChart,
  },
  {
    title: 'Community SUpport',
    description:
      'Join a community or learners and instructors to collaborate and share knowledge',
    icon: Users2Icon,
  },
];

export default function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex items-center text-center flex-col space-y-8">
          <Badge variant="outline">The Future of Online Education</Badge>
          <h1 className="text-4xl md:text-6xl tracking-tight font-bold">
            Elevate Your Learning Experience
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover a new way to learn with our modern, interactive learning
            management system. Access high-qualitycourses anytime, anywere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/course" className={buttonVariants({ size: 'lg' })}>
              Explore Courses
            </Link>
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map(({ description, icon: Icon, title }) => (
          <Card key={title}>
            <CardHeader>
              <Icon size={30} />
              <CardTitle className="pt-5">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
