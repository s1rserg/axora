export const locales = ['en', 'uk'] as const;
export const defaultLocale = 'en';
export type Locale = (typeof locales)[number];
export const localeDetails: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'uk', label: 'Українська' },
];
