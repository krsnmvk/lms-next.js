'use client';

import * as z from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RiGithubFill } from '@remixicon/react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTransition } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.email(),
});

export default function SignInForm() {
  const [isSocialPending, starSocialtTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  async function handleSocialLogin(provider: 'github' | 'google') {
    starSocialtTransition(async () => {
      await authClient.signIn.social({
        provider: provider,
        callbackURL: '/',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Singned in Github, you will be redirected.');
          },

          onError: (err) => {
            console.log(err.error.message);
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>Login with your account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Button
          type="button"
          onClick={() => handleSocialLogin('github')}
          disabled={isSocialPending}
          variant="outline"
        >
          <RiGithubFill
            className="me-1 text-[#333333] dark:text-white/60"
            size={16}
            aria-hidden="true"
          />
          <span>Login with Github</span>
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:border-t after:border-border">
          <span className="relative z-10 px-2 bg-card text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jhon@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full"
            >
              Sign in
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
