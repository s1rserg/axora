'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  Button,
} from '@/components/ui';
import { loginAction } from '@/actions';
import { FormInput } from '@/components/form-input';
import { Nullable } from '@/types/utils';
import { SignInDefaultValues } from './config';
import { SignInLocalDto } from '@/lib/api/services/auth/types';
import { SignInLocalSchema } from '@/lib/api/services/auth/schemas';
import { Loader } from 'lucide-react';
import { PasswordInput } from '@/components/password-input';
import { AppRoutes } from '@/lib/routes';

export function SignInForm() {
  const [serverError, setServerError] = useState<Nullable<string>>(null);

  const form = useForm<SignInLocalDto>({
    resolver: zodResolver(SignInLocalSchema),
    defaultValues: SignInDefaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = form;

  async function onSubmit(data: SignInLocalDto) {
    setServerError(null);

    const response = await loginAction(data);

    if (response?.error) {
      setServerError(response.error);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              control={control}
              clearErrors={clearErrors}
              name="email"
              label="Email"
              placeholder="you@example.com"
              errorMsg={errors.email?.message}
              autoComplete="username"
            />

            <PasswordInput
              control={control}
              clearErrors={clearErrors}
              name="password"
              label="Password"
              errorMsg={errors.password?.message}
            />

            {serverError && (
              <p className="text-sm font-medium text-destructive text-center">{serverError}</p>
            )}

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Loader /> : 'Sign In'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href={AppRoutes.auth.register} className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
