import { ComponentProps } from 'react';
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
  type UseFormClearErrors,
} from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';

interface FormInputProps<T extends FieldValues>
  extends Omit<ComponentProps<'input'>, 'name' | 'value' | 'onChange' | 'onBlur'> {
  name: Path<T>;
  control: Control<T>;
  clearErrors?: UseFormClearErrors<T>;
  label?: string;
  errorMsg?: string;
  i18nPrefix?: string;
}

export const FormInput = <T extends FieldValues>({
  name,
  label,
  control,
  clearErrors,
  errorMsg,
  className,
  i18nPrefix,
  ...props
}: FormInputProps<T>) => {
  const { field, fieldState } = useController({ name, control });
  const t = useTranslations();

  const errorKey = errorMsg || fieldState.error?.message;

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={name} className={cn(fieldState.error && 'text-destructive')}>
          {label}
        </Label>
      )}
      <Input
        id={name}
        {...field}
        value={field.value ?? ''}
        {...props}
        onChange={(e) => {
          field.onChange(e);
          if (clearErrors) clearErrors(name);
          props.onChangeCapture?.(e);
        }}
        className={cn(fieldState.error && 'border-destructive ring-destructive/10')}
      />

      {errorKey && (
        <p className="text-sm font-medium text-destructive">
          {t((i18nPrefix || '') + '.' + errorKey)}
        </p>
      )}
    </div>
  );
};
