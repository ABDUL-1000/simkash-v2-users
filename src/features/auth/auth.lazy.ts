import { lazy } from "react";

export const LoginPage = lazy(() => import("./pages/LoginPage"));
export const RegisterPage = lazy(() => import("./pages/RegisterPage"));
export const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
export const CheckEmailPage = lazy(() => import("./pages/CheckEmailPage"));
export const VerifyEmailOtpPage = lazy(() => import("./pages/VerifyEmailOtpPage"));
export const CreateNewPasswordPage = lazy(() => import("./pages/CreateNewPasswordPage"));
export const SetTransactionPinPage = lazy(() => import("./pages/SetTransactionPinPage"));
export const ProfileSetupPage = lazy(() => import("./pages/ProfileSetupPage"));