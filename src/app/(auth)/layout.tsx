import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group absolute top-4 left-4'
        )}
      >
        <ArrowLeftIcon
          className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
          size={16}
          aria-hidden="true"
        />
        Back
      </Link>
      <div className="w-full max-w-sm flex flex-col gap-5">{children}</div>
    </div>
  );
}
