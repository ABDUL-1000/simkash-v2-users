import { useState } from "react";
import { Check, Copy, ShieldCheck, AlertCircle, RefreshCw } from "lucide-react";
import { useGetUserProfile } from "../api/useGetUserProfile";
import { EditProfileModal } from "../Modals/EditProfileModal";
import { ChangePhoneNumberModal } from "../Modals/ChangePhoneNumberModal";
import { VerifyNewNumberModal } from "../Modals/VerifyNewNumberModal";

export function ProfileTab() {
  const { userData, profile, isLoading } = useGetUserProfile();

  const [copiedCode, setCopiedCode] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePhoneOpen, setChangePhoneOpen] = useState(false);
  const [verifyOtpOpen, setVerifyOtpOpen] = useState(false);
  const [newPhone, setNewPhone] = useState("");

  const fullName = profile?.fullname || userData?.username || "Simkash User";
  const email = userData?.email || "—";
  const phone = userData?.phone || "—";
  const gender = profile?.gender
    ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1).toLowerCase()
    : "Not Specified";
  const country = profile?.country || "Nigeria";
  const currency = profile?.currency || "NGN";
  const isVerified = userData?.isVerified ?? false;
  const isProfileComplete = userData?.isProfileComplete ?? false;

  const referralCode = userData?.username
    ? userData.username.toUpperCase()
    : "SIMKASH50";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Card 1: Personal Information */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 sm:p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#0F152A]">Personal Information</h3>
            {isLoading && <RefreshCw className="size-3.5 text-blue-600 animate-spin" />}
          </div>
          <button
            type="button"
            onClick={() => setEditProfileOpen(true)}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            Edit Profile
          </button>
        </div>

        {/* Avatar Section */}
        <div className="rounded-2xl bg-[#F8FAFC] p-4 sm:p-6 text-center space-y-2">
          {profile?.profile_picture ? (
            <img
              src={profile.profile_picture}
              alt={fullName}
              className="mx-auto size-20 rounded-full object-cover shadow-md border-2 border-white ring-2 ring-[#2563EB]/20"
            />
          ) : (
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#2563EB] text-xl font-extrabold text-white shadow-md">
              {initials}
            </div>
          )}

          <button
            type="button"
            onClick={() => setEditProfileOpen(true)}
            className="text-xs font-bold text-[#2563EB] hover:underline block mx-auto pt-1"
          >
            Change Photo
          </button>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E2ECF6] px-3 py-1 text-[11px] font-mono font-bold text-[#0F152A]">
            <span>Code: {referralCode}</span>
            <button
              type="button"
              onClick={handleCopyCode}
              className="text-[#8C909B] hover:text-[#0F152A] transition"
              title="Copy referral code"
            >
              {copiedCode ? (
                <Check className="size-3 text-[#10B981]" />
              ) : (
                <Copy className="size-3" />
              )}
            </button>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="text-[#8C909B] font-semibold">Full Name</label>
            <input
              type="text"
              readOnly
              value={fullName}
              className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5 px-3.5 font-bold text-[#0F152A] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#8C909B] font-semibold">Email</label>
            <div className="relative">
              <input
                type="email"
                readOnly
                value={email}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5 px-3.5 pr-10 font-bold text-[#0F152A] outline-none truncate"
              />
              {isVerified && (
                <Check className="absolute right-3.5 top-3 size-4 text-[#10B981]" />
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[#8C909B] font-semibold">Phone Number</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={phone}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5 px-3.5 font-bold text-[#0F152A] outline-none"
              />
              <button
                type="button"
                onClick={() => setChangePhoneOpen(true)}
                className="text-xs font-bold text-[#2563EB] hover:underline shrink-0"
              >
                Change
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[#8C909B] font-semibold">Gender</label>
            <input
              type="text"
              readOnly
              value={gender}
              className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5 px-3.5 font-bold text-[#0F152A] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#8C909B] font-semibold">Country</label>
            <input
              type="text"
              readOnly
              value={country}
              className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5 px-3.5 font-bold text-[#0F152A] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#8C909B] font-semibold">Base Currency</label>
            <input
              type="text"
              readOnly
              value={currency}
              className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5 px-3.5 font-bold text-[#0F152A] outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end pt-2 gap-2">
          <button
            type="button"
            onClick={() => setEditProfileOpen(true)}
            className="w-full sm:w-auto rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition text-center"
          >
            Edit Profile Details
          </button>
        </div>
      </div>

      {/* Card 2: Identity & Account Verification */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">Account Verification</h3>

        <div className="divide-y divide-[#E2ECF6] text-xs">
          <div className="flex items-center justify-between py-3 first:pt-0">
            <div>
              <h4 className="font-extrabold text-[#0F152A]">Email Verification</h4>
              <p className="text-[11px] text-[#8C909B]">{email}</p>
            </div>
            <span
              className={`rounded-full px-3 py-0.5 text-[10px] font-bold flex items-center gap-1 ${
                isVerified
                  ? "bg-[#EBFFF8] text-[#10B981]"
                  : "bg-[#FFFBEB] text-[#F59E0B]"
              }`}
            >
              {isVerified ? (
                <>
                  <ShieldCheck className="size-3" /> Verified
                </>
              ) : (
                <>
                  <AlertCircle className="size-3" /> Unverified
                </>
              )}
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-extrabold text-[#0F152A]">Profile Setup</h4>
              <p className="text-[11px] text-[#8C909B]">Name, Gender, & Pin</p>
            </div>
            <span
              className={`rounded-full px-3 py-0.5 text-[10px] font-bold ${
                isProfileComplete
                  ? "bg-[#EBFFF8] text-[#10B981]"
                  : "bg-[#FFFBEB] text-[#F59E0B]"
              }`}
            >
              {isProfileComplete ? "Completed" : "Incomplete"}
            </span>
          </div>
        </div>

        {/* Verification Progress Bar */}
        <div className="rounded-2xl bg-[#F8FAFC] p-4 space-y-2 text-xs">
          <span className="font-bold text-[#0F152A]">
            {isVerified && isProfileComplete
              ? "✓ Profile and account fully verified"
              : "⚠ Account setup partially complete"}
          </span>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
            <div
              className="h-full rounded-full bg-[#2563EB] transition-all"
              style={{
                width: isVerified && isProfileComplete ? "100%" : isVerified || isProfileComplete ? "50%" : "20%",
              }}
            />
          </div>
          <p className="text-[10px] text-[#8C909B]">
            Complete verification to unlock higher transaction and payout limits
          </p>
        </div>
      </div>

      {/* Card 3: Your Referral */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">Your Referral Program</h3>

        <div className="rounded-2xl bg-[#0F152A] p-4 sm:p-5 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9DF8DA]">
              REFERRAL CODE
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-widest text-white mt-0.5">
              {referralCode}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className="w-full sm:w-auto rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold text-white hover:bg-white/20 transition text-center"
          >
            {copiedCode ? "Copied!" : "Copy Code"}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#0F152A]">
          <span className="rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] px-3.5 py-1.5">
            Active Community
          </span>
          <span className="rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] px-3.5 py-1.5 text-emerald-600">
            Instant Commission
          </span>
          <span className="rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] px-3.5 py-1.5">
            Multi-Tier Rewards
          </span>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        onOpenChangePhone={() => setChangePhoneOpen(true)}
        initialData={{
          fullname: profile?.fullname || userData?.username,
          phone: userData?.phone || undefined,
          gender: profile?.gender,
          country: profile?.country,
          profile_picture: profile?.profile_picture,
        }}
      />
      <ChangePhoneNumberModal
        open={changePhoneOpen}
        onOpenChange={setChangePhoneOpen}
        currentPhone={phone}
        onOtpSent={(num) => {
          setNewPhone(num);
          setVerifyOtpOpen(true);
        }}
      />
      <VerifyNewNumberModal
        open={verifyOtpOpen}
        onOpenChange={setVerifyOtpOpen}
        newPhone={newPhone}
        oldPhone={phone}
      />
    </div>
  );
}
