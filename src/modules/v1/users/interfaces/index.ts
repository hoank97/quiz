export interface IUser {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ILogin extends IUser {
  accessToken: string;
  refreshToken: string;
}
