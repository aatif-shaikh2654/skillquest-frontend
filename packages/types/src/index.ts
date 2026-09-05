export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
};

export type AuthResponse = {
  message?: string;
};
