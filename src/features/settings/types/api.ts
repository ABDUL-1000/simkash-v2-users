import type { ApiResponse } from "@/features/auth/types/api";

export interface BankAccountItem {
  id: number;
  user_id: number;
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_name: string;
  is_default: boolean;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileDetails {
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

export interface UserProfileResponseData {
  id: number;
  username: string;
  email: string;
  phone: string;
  status: string;
  pin: string | null;
  isProfileComplete: boolean;
  isVerified: boolean;
  isCompany: boolean;
  source: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  user_profile?: UserProfileDetails;
  bank_accounts?: BankAccountItem[];
}

export interface UpdateProfilePayload {
  fullname?: string;
  phone?: string;
  gender?: string;
  country?: string;
  profile_picture?: string;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface ChangePinPayload {
  old_pin: string;
  new_pin: string;
  confirm_new_pin: string;
}

export type GetUserProfileApiResponse = ApiResponse<UserProfileResponseData>;
export type UpdateProfileApiResponse = ApiResponse<UserProfileDetails | UserProfileResponseData>;
