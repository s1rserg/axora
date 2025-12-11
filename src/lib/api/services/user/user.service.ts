import { fetchClient } from '../../fetch-client';
import type { User } from './types';

class UserService {
  public async fetchMe(): Promise<User> {
    return fetchClient<User>('/users/me', {
      method: 'GET',
    });
  }
}

export const userService = new UserService();
