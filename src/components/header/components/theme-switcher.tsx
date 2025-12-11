'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { IconButton } from '../../icon-button';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('common.header.theme');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <IconButton
      onClick={toggleTheme}
      label={isDark ? t('light') : t('dark')}
      icon={
        <>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </>
      }
    />
  );
};
