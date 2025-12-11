import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { AppRoutes } from '@/lib/routes';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (!token.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'GET',
      headers: {
        Cookie: `refresh_token=${token.refreshToken}`,
      },
    });

    const tokens = await response.json();

    if (!response.ok) throw tokens;

    return {
      ...token,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken ?? token.refreshToken,
      expiresAt: Date.now() + 15 * 60 * 1000,
      error: undefined,
    };
  } catch (error) {
    console.error('RefreshAccessTokenError', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: AppRoutes.auth.login,
  },
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(`${API_BASE_URL}/auth/sign-in`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();

        if (!res.ok) return null;

        return {
          id: 'user_id_placeholder',
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiresIn: 15 * 60 * 1000,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: Date.now() + (user.expiresIn || 0),
        };
      }

      if (typeof token.expiresAt === 'number' && Date.now() < token.expiresAt) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});
