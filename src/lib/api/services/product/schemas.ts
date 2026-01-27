import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const CreateProductSchema = z.object({
  title: z.string().min(3, 'validation.titleMin'),
  slug: z
    .string()
    .min(3, 'validation.slugMin')
    .regex(/^[a-z0-9-]+$/, 'validation.slugRegex'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'validation.priceMin'),
  stock: z.coerce.number().int().min(0, 'validation.stockMin'),
  isActive: z.boolean().default(true),
  files: z
    .array(z.instanceof(File))
    .optional()
    .refine((files) => !!files && files.length > 0, 'validation.filesRequired')
    .refine((files) => !files || files.length <= 10, 'validation.filesMax')
    .refine(
      (files) => !files || files.every((file) => file.size <= MAX_FILE_SIZE),
      'validation.filesSize',
    )
    .refine(
      (files) => !files || files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'validation.filesType',
    ),
});
