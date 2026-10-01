import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X, Loader2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { PasswordInputField } from "@/features/auth/components/PasswordInputField";
import { PasswordStrengthBar } from "@/features/auth/components/PasswordStrengthBar";
import {
  changePasswordSchema,
  type ChangePasswordSchemaType,
} from "@/utils/validation/auth.schemas";
import { useChangePassword } from "../api/useChangePassword";

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordModal({
  open,
  onOpenChange,
}: ChangePasswordModalProps) {
  const { mutate: changePassword, isPending } = useChangePassword();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  const newPassword = watch("new_password") || "";

  useEffect(() => {
    if (!open) {
      reset({
        old_password: "",
        new_password: "",
        confirm_new_password: "",
      });
    }
  }, [open, reset]);

  const has8Chars = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasNum = /[0-9]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

  const onSubmit = (values: ChangePasswordSchemaType) => {
    changePassword(values, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => {
        if (!isPending) onOpenChange(v);
      }}
      title="Change Password"
      description="Update your account password with a strong, secure password"
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
        {/* Current Password */}
        <Controller
          name="old_password"
          control={control}
          render={({ field }) => (
            <PasswordInputField
              {...field}
              id="old_password"
              label="Current Password"
              placeholder="Enter your current password"
              requiredMark
              error={errors.old_password?.message}
              disabled={isPending}
            />
          )}
        />

        {/* New Password */}
        <div className="space-y-2">
          <Controller
            name="new_password"
            control={control}
            render={({ field }) => (
              <PasswordInputField
                {...field}
                id="new_password"
                label="New Password"
                placeholder="Enter your new password"
                requiredMark
                error={errors.new_password?.message}
                disabled={isPending}
              />
            )}
          />

          <PasswordStrengthBar password={newPassword} />
        </div>

        {/* Criteria Checklist */}
        <div className="grid grid-cols-2 gap-2 text-xs py-1">
          <div
            className={`flex items-center gap-1.5 ${
              has8Chars ? "text-[#10B981]" : "text-[#8C909B]"
            }`}
          >
            {has8Chars ? <Check className="size-3.5" /> : <X className="size-3.5" />}
            <span>At least 8 characters</span>
          </div>

          <div
            className={`flex items-center gap-1.5 ${
              hasUpper ? "text-[#10B981]" : "text-[#8C909B]"
            }`}
          >
            {hasUpper ? <Check className="size-3.5" /> : <X className="size-3.5" />}
            <span>One uppercase letter</span>
          </div>

          <div
            className={`flex items-center gap-1.5 ${
              hasNum ? "text-[#10B981]" : "text-[#8C909B]"
            }`}
          >
            {hasNum ? <Check className="size-3.5" /> : <X className="size-3.5" />}
            <span>One number</span>
          </div>

          <div
            className={`flex items-center gap-1.5 ${
              hasSpecial ? "text-[#10B981]" : "text-[#8C909B]"
            }`}
          >
            {hasSpecial ? <Check className="size-3.5" /> : <X className="size-3.5" />}
            <span>One special character</span>
          </div>
        </div>

        {/* Confirm New Password */}
        <Controller
          name="confirm_new_password"
          control={control}
          render={({ field }) => (
            <PasswordInputField
              {...field}
              id="confirm_new_password"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              requiredMark
              error={errors.confirm_new_password?.message}
              disabled={isPending}
            />
          )}
        />

        {/* Footer Actions */}
        <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-blue-700 disabled:opacity-60"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isPending ? "Updating..." : "Change Password"}
          </button>
        </div>
      </form>
    </AppModal>
  );
}
