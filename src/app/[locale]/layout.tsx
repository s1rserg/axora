import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Locale, locales, routing } from '@/i18n';
import { Header } from '@/components/header';
import { ThemeProvider } from '@/theme';
import { TooltipProvider } from '@/components/ui';
import { setRequestLocale } from 'next-intl/server';
import { auth } from '@/auth';
import { userService, favoriteService, cartService, Product, User } from '@/lib/api';
import { StateProvider } from '@/providers/state-provider';
import { CartItem } from '@/lib/api/services/cart/cart.service';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Axora',
  description: 'E-commerce of the future. Built with Next.js.',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const session = await auth();
  const messages = await getMessages();

  let user = null;
  let favorites: Product[] = [];
  let cart: CartItem[] = [];

  if (session) {
    try {
      [user, favorites, cart] = (await Promise.all([
        userService.fetchMe(),
        favoriteService.getAll(),
        cartService.getCart(),
      ])) as [User, Product[], CartItem[]];
    } catch (error: unknown) {
      console.error('Failed to fetch initial state:', error);
    }
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <StateProvider initialFavorites={favorites} initialCart={cart}>
              <TooltipProvider>
                <Header user={user} />
                <main className="flex-1 container mx-auto p-4">{children}</main>
              </TooltipProvider>
            </StateProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
