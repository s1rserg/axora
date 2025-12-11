'use client';

import { Check, Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../ui';
import { usePathname, useRouter, localeDetails, type Locale } from '@/i18n';

export const LanguageSwitcher = () => {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (nextLocale: Locale) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={t('header.language')}>
              <Languages className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('header.language')}</p>
        </TooltipContent>
      </Tooltip>

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
};
