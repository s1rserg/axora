'use client';

import { LogOut, User as UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../ui';
import { logoutAction } from '@/actions';
import { FC, useEffect, useState } from 'react';
import { getCurrentUserAction } from '@/actions/user/user.actions';
import { User } from '@/lib/api';
import { Nullable } from '@/types/utils';

interface Props {
  initialUser: Nullable<User>;
}

export const UserNav: FC<Props> = ({ initialUser }) => {
  const t = useTranslations('common.header.user');
  const [user, setUser] = useState<Nullable<User>>(initialUser);
  const [isLoading, setIsLoading] = useState(!initialUser);

  useEffect(() => {
    if (!initialUser) {
      const fetchUser = async () => {
        setIsLoading(true);
        const { data } = await getCurrentUserAction();
        if (data) {
          setUser(data);
        }
        setIsLoading(false);
      };
      fetchUser();
    }
  }, [initialUser]);

  if (isLoading) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />;
  }

  if (!user) return null;

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={t('label')}>
              <UserIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('label')}</p>
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {t('hello', { name: user.username })}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logoutAction()}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
