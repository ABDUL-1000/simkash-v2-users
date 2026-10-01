import { z } from "zod";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}+=\-_.:;,<>/\\|~`])[A-Za-z\d@$!%*?&^#()[\]{}+=\-_.:;,<>/\\|~`]{8,}$/;

export const registerSchema = z
  .object({
    email: z.string().trim().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        passwordRegex,
        "Must contain uppercase, lowercase, number, and special character"
      ),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const loginSchema = z.object({
  phoneOrEmail: z.string().trim().min(1, "Email or phone number is required"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export const resetPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        passwordRegex,
        "Must contain uppercase, lowercase, number, and special character"
      ),
    confirm_new_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords do not match",
    path: ["confirm_new_password"],
  });

export const profileSetupSchema = z.object({
  fullname: z.string().trim().min(2, "Full name must be at least 2 characters"),
  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+234|0)[789]\d{9}$/,
      "Please enter a valid Nigerian phone number (e.g. 08012345678)"
    ),
  gender: z.enum(["male", "female"], {
    message: "Please select your gender",
  }),
  country: z.string().trim().min(1, "Country is required"),
  pin: z
    .string()
    .length(4, "PIN must be exactly 4 digits")
    .regex(/^\d{4}$/, "PIN must be 4 digits"),
});

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, "Current password is required"),
    new_password: z
      .string()
      .min(8, "New password must be at least 8 characters long")
      .regex(
        passwordRegex,
        "Must contain uppercase, lowercase, number, and special character"
      ),
    confirm_new_password: z
      .string()
      .min(1, "Please confirm your new password"),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords do not match",
    path: ["confirm_new_password"],
  });

export const changePinSchema = z
  .object({
    old_pin: z
      .string()
      .length(4, "Current PIN must be 4 digits")
      .regex(/^\d{4}$/, "PIN must contain only numbers"),
    new_pin: z
      .string()
      .length(4, "New PIN must be 4 digits")
      .regex(/^\d{4}$/, "PIN must contain only numbers"),
    confirm_new_pin: z
      .string()
      .length(4, "Please confirm your 4-digit PIN")
      .regex(/^\d{4}$/, "PIN must contain only numbers"),
  })
  .refine((data) => data.new_pin === data.confirm_new_pin, {
    message: "PINs do not match",
    path: ["confirm_new_pin"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type OtpSchemaType = z.infer<typeof otpSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export type ProfileSetupSchemaType = z.infer<typeof profileSetupSchema>;
export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
export type ChangePinSchemaType = z.infer<typeof changePinSchema>;
