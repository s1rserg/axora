'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('auth');
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
        <CardTitle>{t('signUp.title')}</CardTitle>
        <CardDescription>{t('signUp.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              control={control}
              clearErrors={clearErrors}
              name="username"
              label={t('fields.username')}
              errorMsg={errors.username?.message ? t(errors.username.message) : undefined}
            />

            <FormInput
              control={control}
              clearErrors={clearErrors}
              name="email"
              label={t('fields.email')}
              placeholder={t('fields.emailPlaceholder')}
              errorMsg={errors.email?.message ? t(errors.email.message) : undefined}
              autoComplete="username"
            />

            <PasswordInput
              control={control}
              clearErrors={clearErrors}
              name="password"
              label={t('fields.password')}
              errorMsg={errors.password?.message ? t(errors.password.message) : undefined}
            />

            <PasswordInput
              control={control}
              clearErrors={clearErrors}
              name="confirmPassword"
              label={t('fields.confirmPassword')}
              errorMsg={
                errors.confirmPassword?.message ? t(errors.confirmPassword.message) : undefined
              }
            />

            {serverError && (
              <p className="text-sm font-medium text-destructive text-center">{serverError}</p>
            )}

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Loader /> : t('signUp.submit')}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          {t('signUp.hasAccount')}{' '}
          <Link href={AppRoutes.auth.login} className="text-primary hover:underline">
            {t('signUp.link')}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
