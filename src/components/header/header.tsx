import { Link } from '@/i18n/routing';
import { ThemeSwitcher, LanguageSwitcher, UserNav, FavoriteLink, CartLink } from './components';
import { AppRoutes } from '@/lib/routes';
import Image from 'next/image';
import { User } from '@/lib/api';
import { Nullable } from '@/types/utils';

interface Props {
  user: Nullable<User>;
}

export const Header = ({ user }: Props) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="mr-4 flex">
          <Link href={AppRoutes.app.root} className="mr-6 flex items-center space-x-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} className="dark:invert" />
            <span className="font-bold text-xl">Axora</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-1">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <FavoriteLink />
            <CartLink />
            <UserNav initialUser={user} />
          </nav>
        </div>
      </div>
    </header>
  );
};
