'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, UploadCloud, Star } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface Props {
  value: File[];
  onChange: (files: File[]) => void;
  error?: string;
  i18nPrefix?: string;
}

export const ImageUploader: FC<Props> = ({ value, onChange, error, i18nPrefix }) => {
  const t = useTranslations('common.imageUploader');
  const rawT = useTranslations('');
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);

  useEffect(() => {
    const newPreviews = value.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange([...value, ...acceptedFiles]);
    },
    [onChange, value],
  );

  const removeFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.webp'],
    },
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted/50',
          error && 'border-destructive',
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <UploadCloud className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isDragActive ? t('dragActive') : t('dragInactive')}
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm font-medium text-destructive">
          {i18nPrefix ? rawT(i18nPrefix + '.' + error) : error}
        </p>
      )}

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div
              key={preview.url}
              className="relative group aspect-square rounded-md overflow-hidden border bg-background"
            >
              <Image
                src={preview.url}
                alt="Preview"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />

              {index === 0 && (
                <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-current" />
                </div>
              )}

              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(index)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
