import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CheckEmailPage from "./pages/CheckEmailPage";
import VerifyEmailOtpPage from "./pages/VerifyEmailOtpPage";
import CreateNewPasswordPage from "./pages/CreateNewPasswordPage";
import SetTransactionPinPage from "./pages/SetTransactionPinPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";

export const authRoutes: TRouteData[] = [
  {
    path: appPaths.login,
    element: <LoginPage />,
    title: "Sign In",
    isSearchable: false,
  },
  {
    path: appPaths.register,
    element: <RegisterPage />,
    title: "Create Account",
    isSearchable: false,
  },
  {
    path: appPaths.forgotPassword,
    element: <ForgotPasswordPage />,
    title: "Reset Password",
    isSearchable: false,
  },
  {
    path: appPaths.checkEmail,
    element: <CheckEmailPage />,
    title: "Check Email",
    isSearchable: false,
  },
  {
    path: appPaths.verifyEmailOtp,
    element: <VerifyEmailOtpPage />,
    title: "Verify Email OTP",
    isSearchable: false,
  },
  {
    path: appPaths.resetPassword,
    element: <CreateNewPasswordPage />,
    title: "Create New Password",
    isSearchable: false,
  },
  {
    path: appPaths.setPin,
    element: <SetTransactionPinPage />,
    title: "Set Transaction PIN",
    isSearchable: false,
  },
  {
    path: appPaths.confirmPin,
    element: <SetTransactionPinPage />,
    title: "Confirm Transaction PIN",
    isSearchable: false,
  },
  {
    path: appPaths.profileSetup,
    element: <ProfileSetupPage />,
    title: "Complete Profile",
    isSearchable: false,
  },
];
