import { fetchClient } from '../../fetch-client';
import type { SignUpLocalDto, AuthResponse } from './types';

class AuthService {
  public async signUp(data: SignUpLocalDto): Promise<AuthResponse> {
    return fetchClient<AuthResponse>('/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const authService = new AuthService();
