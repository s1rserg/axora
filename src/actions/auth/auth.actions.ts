'use server';

import { signIn, signOut } from '@/auth';
import AuthError from 'next-auth';
import { AppRoutes } from '@/lib/routes';
import { authService } from '@/lib/api';
import { SignInLocalDto, SignUpLocalDto } from '@/lib/api/services/auth/types';
import { redirect } from 'next/navigation';

export async function loginAction(data: SignInLocalDto) {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Something went wrong. Please try again.' };
    }
    throw error;
  }

  redirect(AppRoutes.app.root);
}

export async function registerAction(data: SignUpLocalDto) {
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
      return { error: 'Account created, but failed to auto-login.' };
    }

    return { error: 'Failed to create account.' };
  }

  redirect(AppRoutes.app.root);
}

export async function logoutAction() {
  await signOut({ redirectTo: AppRoutes.auth.login });
}
