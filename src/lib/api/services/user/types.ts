import { Nullable } from '@/types/utils';

export interface UserAvatarMedia {
  id: number;
  createdAt: string;
  width: number;
  height: number;
  secureUrl: string;
}

export interface User {
  id: number;
  email: string;
  name: Nullable<string>;
  surname: Nullable<string>;
  username: string;
  createdAt: Date;
  avatar: Nullable<UserAvatarMedia>;
}
