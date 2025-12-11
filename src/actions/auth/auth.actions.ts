'use server';

import { signIn, signOut } from '@/auth';
import AuthError from 'next-auth';
import { AppRoutes } from '@/lib/routes';
import { authService } from '@/lib/api';
import { SignInLocalDto, SignUpLocalDto } from '@/lib/api/services/auth/types';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export async function loginAction(data: SignInLocalDto) {
  const t = await getTranslations('auth.serverErrors');

  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  } catch (error) {
    if ((error as { type: string }).type === 'CredentialsSignin') {
      return { error: t('invalidCredentials') };
    }
    console.log(error, error instanceof AuthError);
    return { error: t('somethingWentWrong') };
  }

  redirect(AppRoutes.app.root);
}

export async function registerAction(data: SignUpLocalDto) {
  const t = await getTranslations('auth.serverErrors');

  try {
    await authService.signUp(data);

    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof Error && !(error instanceof AuthError)) {
      return { error: error.message };
    }

    if (error instanceof AuthError) {
      return { error: t('accountCreatedLoginFailed') };
    }

    return { error: t('default') };
  }

  redirect(AppRoutes.app.root);
}

export async function logoutAction() {
  await signOut({ redirectTo: AppRoutes.auth.login });
}
