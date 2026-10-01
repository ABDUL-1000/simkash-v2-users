import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AuthLayout } from "../components/AuthLayout";
import { useProfileSetup } from "../api/useProfileSetup";
import { useAuthStore } from "@/store/authStore";

export default function ProfileSetupPage() {
  const user = useAuthStore((state) => state.user);
  const userProfile = useAuthStore((state) => state.userProfile);

  const [fullname, setFullname] = useState(userProfile?.fullname || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [gender, setGender] = useState(userProfile?.gender || "male");
  const [country, setCountry] = useState(userProfile?.country || "Nigeria");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutate: profileSetup, isPending } = useProfileSetup({
    onError: (err) => {
      const msg =
        (err as any)?.response?.data?.message ||
        err?.message ||
        "Unable to complete profile setup. Please try again.";
      setError(msg);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullname.trim() || !phone.trim() || !pin) {
      setError("Please complete all required fields and enter your 4-digit PIN.");
      return;
    }

    if (pin.length !== 4) {
      setError("PIN must be exactly 4 digits.");
      return;
    }

    profileSetup({
      fullname: fullname.trim(),
      phone: phone.trim(),
      gender,
      country,
      pin,
    });
  };

  return (
    <AuthLayout>
      {/* Title & Subtext */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
          Complete Your Profile
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Set up your personal details and 4-digit security PIN to activate your
          account workspace.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700 animate-in fade-in">
          {error}
        </div>
      ) : null}

      {/* Setup Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="fullname" className="block text-sm font-semibold text-[#0F172A]">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullname"
            type="text"
            required
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="e.g. Yusuf Adam Baba"
            className="w-full rounded-xl border border-[#E2ECF6] bg-white px-4 py-3 text-sm text-[#0F172A] placeholder-[#8C909B] transition-all outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
          />
        </div>

        {/* Phone & Gender Row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="phone" className="block text-sm font-semibold text-[#0F172A]">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 08012345678"
              className="w-full rounded-xl border border-[#E2ECF6] bg-white px-4 py-3 text-sm text-[#0F172A] placeholder-[#8C909B] transition-all outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gender" className="block text-sm font-semibold text-[#0F172A]">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full rounded-xl border border-[#E2ECF6] bg-white px-4 py-3 text-sm text-[#0F172A] transition-all outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Country */}
        <div className="space-y-1.5">
          <label htmlFor="country" className="block text-sm font-semibold text-[#0F172A]">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            id="country"
            type="text"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white px-4 py-3 text-sm text-[#0F172A] transition-all outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
          />
        </div>

        {/* Transaction PIN */}
        <div className="space-y-2 pt-2">
          <label className="block text-sm font-semibold text-[#0F172A]">
            4-Digit Transaction PIN <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-slate-500">
            Your 4-digit PIN will be used to authorize transactions, withdrawals, and stock movements.
          </p>

          <div className="flex justify-center py-2">
            <InputOTP maxLength={4} value={pin} onChange={setPin}>
              <InputOTPGroup className="gap-3 sm:gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="size-14 rounded-2xl border border-[#E2ECF6] bg-white text-2xl font-black text-[#0F172A] shadow-xs transition-all data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/25"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={isPending || pin.length !== 4}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3.5 px-4 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <>
              <span>Complete Setup &amp; Continue</span>
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
