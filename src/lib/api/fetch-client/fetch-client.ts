import { auth, signOut } from '@/auth';
import { FetchOptions } from './types';
import { AppRoutes } from '@/lib/routes';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchClient<T>(path: string, options: FetchOptions = {}): Promise<T> {
  let token: string | undefined;

  if (!options.skipAuth) {
    const session = await auth();

    if (session?.error === 'RefreshAccessTokenError') {
      await signOut({ redirect: true, redirectTo: AppRoutes.auth.login });
    }

    token = session?.accessToken;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || response.statusText);
  }

  return response.json();
}
