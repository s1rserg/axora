import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { Locale } from './config';
import { readdirSync } from 'fs';
import path from 'path';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const messagesDir = path.join(process.cwd(), 'messages');
  const namespaces = readdirSync(messagesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const loadedMessages = await Promise.all(
    namespaces.map(async (namespace) => {
      try {
        const messages = (await import(`../../messages/${namespace}/${locale}.json`)).default;
        return { namespace, messages };
      } catch {
        console.warn(`Warning: Missing translation file for ${namespace}/${locale}`);
        return null;
      }
    }),
  );

  const messages = loadedMessages.reduce((acc, item) => {
    if (item) {
      acc[item.namespace] = item.messages;
    }
    return acc;
  }, {} as Record<string, string>);

  return {
    locale,
    messages,
  };
});
