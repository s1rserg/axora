import { cookies } from 'next/headers';
import { REFRESH_TOKEN_COOKIE, API_BASE_URL } from './constants';

export async function refreshTokens() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'GET',
      headers: {
        Cookie: `${REFRESH_TOKEN_COOKIE}=${refreshToken}`,
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    const newAccessToken = data.accessToken;

    const setCookieHeader = res.headers.get('set-cookie');

    return { newAccessToken, setCookieHeader };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
