export * from "./api";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role?: string;
    };
  };
}

export interface IRegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IVerifyOtpPayload {
  email?: string;
  otp: string;
}

export interface IResetPasswordPayload {
  password: string;
  confirmPassword: string;
}

export interface ISetPinPayload {
  pin: string;
  confirmPin: string;
}

export type PasswordStrength = "weak" | "fair" | "good" | "strong";

export interface PasswordStrengthResult {
  score: number; // 0 to 4
  level: PasswordStrength;
  label: string;
  colorClass: string;
}
