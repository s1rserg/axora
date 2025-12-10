import { SignUpLocalSchema } from '@/lib/api/services/auth/schemas';
import { z } from 'zod';

export const SignUpFormSchema = SignUpLocalSchema.extend({
  confirmPassword: z.string().min(1, 'validation.confirmPasswordRequired'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'validation.passwordsDontMatch',
  path: ['confirmPassword'],
});
