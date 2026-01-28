'use server';

import { userService, User } from '@/lib/api';

export async function getCurrentUserAction(): Promise<{ data?: User; error?: string }> {
  try {
    const data = await userService.fetchMe();
    return { data };
  } catch (_error) {
    return { error: 'Failed to fetch user' };
  }
}
