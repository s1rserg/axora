import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui';
import { Nullable } from '@/types/utils';
import { FC } from 'react';

interface Props {
  isSubmitting: boolean;
  serverError: Nullable<string>;
}

export const FormActions: FC<Props> = ({ isSubmitting, serverError }) => {
  const router = useRouter();
  const t = useTranslations('product.createProduct');
  const tCommon = useTranslations('common.actions');

  return (
    <div className="flex flex-col gap-4">
      {serverError && (
        <div className="p-3 rounded bg-destructive/15 text-destructive text-sm font-medium border border-destructive/20">
          {serverError}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {t('submit')}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          {tCommon('cancel')}
        </Button>
      </div>
    </div>
  );
};
