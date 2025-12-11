import { logoutAction } from '@/actions';
import { Button } from '@/components/ui/button';
import { userService } from '@/lib/api';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const user = await userService.fetchMe();

  const t = await getTranslations('root');

  return (
    <>
      {t('title')}
      <Button onClick={logoutAction}>{t('logout')}</Button>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
