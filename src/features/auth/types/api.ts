import type { UserState, UserProfile, UserWallet } from "@/store/authStore";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface RegisterPayload {
  email: string;
  password: string;
  confirm_password: string;
  fcm_token?: string;
}

export interface LoginPayload {
  phoneOrEmail: string;
  password: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ResendOtpPayload {
  email: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyForgotPasswordPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordPayload {
  new_password: string;
  confirm_new_password: string;
  token?: string;
}

export interface ProfileSetupPayload {
  fullname: string;
  phone: string;
  gender: string;
  country: string;
  pin: string;
}

export interface UserDetails {
  id: number;
  username?: string;
  email: string;
  phone: string | null;
  status?: string;
  pin?: string | null;
  isProfileComplete: boolean;
  isVerified: boolean;
  isCompany?: boolean;
  source?: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileData {
  id: number;
  user_id: number;
  fullname: string;
  gender: string;
  country: string;
  currency: string;
  profile_picture?: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserWalletData {
  id: number;
  user_id: number;
  balance: number;
  commission_balance: number;
  profit_balance: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthMeResponseData {
  user?: UserDetails;
  userDetails: UserDetails;
  role?: string;
  userProfile?: UserProfileData;
  wallet?: UserWalletData;
}

export interface AuthResponseData {
  token?: string;
  accessToken: string;
  refreshToken?: string;
  user: UserState;
  userProfile?: UserProfile;
  wallet?: UserWallet;
}

export interface ResetTokenResponseData {
  resetToken: string;
}
