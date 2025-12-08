// app/actions/auth.actions.ts
'use server';

import { authService, SignInLocalDto, SignUpLocalDto } from '@/api';
import { redirect } from 'next/navigation';

export async function loginAction(data: SignInLocalDto) {
  try {
    await authService.signIn(data);
  } catch (error) {
    return { error: (error as { message: string }).message || 'Failed to sign in' };
  }
  redirect('/');
}

export async function registerAction(data: SignUpLocalDto) {
  try {
    await authService.signUp(data);
  } catch (error) {
    return { error: (error as { message: string }).message || 'Failed to sign up' };
  }

  redirect('/sign-in');
}
