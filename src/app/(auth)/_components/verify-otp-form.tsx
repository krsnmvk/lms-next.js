'use client';
import * as z from 'zod/v4';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const formSchema = z.object({
  otp: z.string().min(6).max(6),
});

export default function VerifyOtpForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: '' },
  });

  const searchParams = useSearchParams();

  const router = useRouter();

  const email = searchParams.get('email') as string;

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: values.otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Email verified');
            router.push('/');
          },

          onError: (err) => {
            toast.error(err.error.message);
          },
        },
      });
    });
  }

  const isOtpCompleted = form.watch('otp').length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Please check your email</CardTitle>
        <CardDescription>
          We have a sent verification email code to your email address. Please
          open your the email and paste the code below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-4"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} disabled={isPending} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <p className="text-xs text-muted-foreground text-center">
                    Enter the 6-digit code sent to your email
                  </p>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending || isOtpCompleted}
              variant="default"
              className="w-full"
            >
              Verify OTP
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
