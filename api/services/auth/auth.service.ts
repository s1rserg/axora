import { fetchClient } from '../../fetchClient';
import type { SignInLocalDto, SignUpLocalDto, AuthResponse } from './types';

class AuthService {
  public async signUp(data: SignUpLocalDto): Promise<AuthResponse> {
    return fetchClient<AuthResponse>('/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  public async signIn(data: SignInLocalDto): Promise<AuthResponse> {
    return fetchClient<AuthResponse>('/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  public async signOut(): Promise<void> {
    return fetchClient<void>('/auth/sign-out', {
      method: 'GET',
    });
  }
}

export const authService = new AuthService();
