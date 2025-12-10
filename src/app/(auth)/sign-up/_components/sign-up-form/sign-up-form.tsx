'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import {
  Button,
  Form,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { Nullable } from '@/types/utils';
import { registerAction } from '@/actions';
import { FormInput } from '@/components/form-input';
import { SignUpDefaultValues } from './config';
import { SignUpFormInput } from './types';
import { SignUpFormSchema } from './schemas';
import { Loader } from 'lucide-react';
import { PasswordInput } from '@/components/password-input';
import { AppRoutes } from '@/lib/routes';

export function SignUpForm() {
  const [serverError, setServerError] = useState<Nullable<string>>(null);

  const form = useForm<SignUpFormInput>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: SignUpDefaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = form;

  async function onSubmit(data: SignUpFormInput) {
    setServerError(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword: _confirmPassword, ...dto } = data;

    const response = await registerAction(dto);
    if (response?.error) {
      setServerError(response.error);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              control={control}
              clearErrors={clearErrors}
              name="username"
              label="Username"
              errorMsg={errors.username?.message}
            />

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

            <PasswordInput
              control={control}
              clearErrors={clearErrors}
              name="confirmPassword"
              label="Confirm Password"
              errorMsg={errors.confirmPassword?.message}
            />

            {serverError && (
              <p className="text-sm font-medium text-destructive text-center">{serverError}</p>
            )}

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Loader /> : 'Sign Up'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href={AppRoutes.auth.login} className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
