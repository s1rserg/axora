'use client';

import { Check, Languages } from 'lucide-react';
import { useLocale } from 'next-intl';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui';
import { usePathname, useRouter, localeDetails, type Locale } from '@/i18n';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (nextLocale: Locale) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Змінити мову">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {localeDetails.map((item) => (
          <DropdownMenuItem
            key={item.code}
            onClick={() => switchLocale(item.code)}
            className="cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>{item.label}</span>
              {locale === item.code && <Check className="h-4 w-4" />}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
