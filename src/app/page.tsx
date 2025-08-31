'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session } = authClient.useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session) return router.push('/sign-in');
  }, [session, router]);

  return (
    <div>
      <h1>Home Page</h1>

      <Button onClick={async () => await authClient.signOut()}>Logout</Button>
    </div>
  );
}
