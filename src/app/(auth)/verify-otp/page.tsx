import { auth } from '@/lib/auth';
import VerifyOtpForm from '../_components/verify-otp-form';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect('/sign-in');

  return <VerifyOtpForm />;
}
