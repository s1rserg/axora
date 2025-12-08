import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ACCESS_TOKEN_COOKIE, API_BASE_URL, REFRESH_TOKEN_COOKIE } from './constants';
import { FetchOptions } from './types';
import { refreshTokens } from './helpers';

export async function fetchClient<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = API_BASE_URL + path;
  let response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const refreshResult = await refreshTokens();

    if (refreshResult && refreshResult.newAccessToken) {
      cookieStore.set(ACCESS_TOKEN_COOKIE, refreshResult.newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 15,
      });

      headers['Authorization'] = `Bearer ${refreshResult.newAccessToken}`;
      response = await fetch(url, {
        ...options,
        headers,
      });
    } else {
      cookieStore.delete(ACCESS_TOKEN_COOKIE);
      cookieStore.delete(REFRESH_TOKEN_COOKIE);
      redirect('/auth/sign-in');
    }
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
