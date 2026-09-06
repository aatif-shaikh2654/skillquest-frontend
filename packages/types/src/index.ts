export type Role = "USER" | "ADMIN" | "SUPER_ADMIN";

export type User = {
  id: string;
  email: string;
  full_name: string;
  phone_number: string | null;
  role: Role;
  is_instructor: boolean;
  is_active: boolean;
  email_verified: boolean;
};

export type ApiSuccess<T = undefined> = T extends undefined
  ? { success: true; message: string }
  : { success: true; message: string; data: T };

export type ApiErrorBody = {
  success: false;
  message: string;
};

export type LoginRequest = {
  email: string;
};

export type SignupRequest = {
  email: string;
  full_name: string;
};

export type ResendOtpRequest = {
  email: string;
};

export type VerifyOtpRequest = {
  email: string;
  code: string;
};

export type SocialLoginRequest = {
  id_token: string;
};

export type LinkGoogleRequest = {
  id_token: string;
};

export type AuthUserResponse = ApiSuccess<User>;
export type MessageResponse = ApiSuccess;

export type AdminRole = "ADMIN" | "SUPER_ADMIN";

export type AdminUser = {
  id: string;
  email: string;
  full_name: string;
  phone_number: string | null;
  role: AdminRole;
  is_active: boolean;
  email_verified: boolean;
};

export type AdminLoginRequest = {
  email: string;
  password: string;
};

export type AdminLoginResponse = ApiSuccess<AdminUser>;
export type AdminMeResponse = ApiSuccess<AdminUser>;

export type Paginated<T> = {
  items: T[];
  page: number;
  limit: number;
  total_count: number;
  total_pages: number;
};

export type AdminUsersResponse = ApiSuccess<Paginated<User>>;
