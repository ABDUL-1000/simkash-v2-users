import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { EditProfileModal } from "../Modals/EditProfileModal";
import { ChangePhoneNumberModal } from "../Modals/ChangePhoneNumberModal";
import { VerifyNewNumberModal } from "../Modals/VerifyNewNumberModal";

export function ProfileTab() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePhoneOpen, setChangePhoneOpen] = useState(false);
  const [verifyOtpOpen, setVerifyOtpOpen] = useState(false);
  const [newPhone, setNewPhone] = useState("08120600542");

  const [fullName, setFullName] = useState("Yusuf Adam Baba");
  console.log("fullName:", setFullName);
  const [email] = useState("yusufababah50@gmail.com");
  const [phone, setPhone] = useState("08065942373");
  console.log("phone:", setPhone);
  const [gender] = useState("Male");
  const [dob] = useState("24 Jun 1990");
  const [state] = useState("Lagos");
  const [lga] = useState("Ikeja");

  const referralCode = "YUSUF50K";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Card 1: Personal Information */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F152A]">Personal Information</h3>
          <button
            type="button"
            onClick={() => setEditProfileOpen(true)}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            Edit
          </button>
        </div>

        {/* Avatar Section */}
        <div className="rounded-2xl bg-[#F8FAFC] p-6 text-center space-y-2">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#2563EB] text-xl font-extrabold text-white shadow-md">
            YA
          </div>
          <button
            type="button"
            onClick={() => setEditProfileOpen(true)}
            className="text-xs font-bold text-[#2563EB] hover:underline block mx-auto"
          >
            Change Photo
          </button>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E2ECF6] px-3 py-1 text-[11px] font-mono font-bold text-[#0F152A]">
            <span>{referralCode}</span>
            <button type="button" onClick={handleCopyCode} className="text-[#8C909B] hover:text-[#0F152A]">
              {copiedCode ? <Check className="size-3 text-[#10B981]" /> : <Copy className="size-3" />}
            </button>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="space-y-4 text-xs">
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
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5 px-3.5 pr-10 font-bold text-[#0F152A] outline-none"
              />
              <Check className="absolute right-3.5 top-3 size-4 text-[#10B981]" />
            </div>
            <p className="text-[10px] text-[#8C909B]">Contact support to change email</p>
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
            <label className="text-[#8C909B] font-semibold">Date of Birth</label>
            <input
              type="text"
              readOnly
              value={dob}
              className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5 px-3.5 font-bold text-[#0F152A] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#8C909B] font-semibold">State</label>
            <input
              type="text"
              readOnly
              value={state}
              className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5 px-3.5 font-bold text-[#0F152A] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#8C909B] font-semibold">LGA</label>
            <input
              type="text"
              readOnly
              value={lga}
              className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5 px-3.5 font-bold text-[#0F152A] outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={() => setEditProfileOpen(true)}
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Card 2: Identity Verification */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">Identity Verification</h3>

        <div className="divide-y divide-[#E2ECF6] text-xs">
          <div className="flex items-center justify-between py-3 first:pt-0">
            <div>
              <h4 className="font-extrabold text-[#0F152A]">BVN</h4>
              <p className="text-[11px] text-[#8C909B]">Bank Verification Number</p>
            </div>
            <span className="rounded-full bg-[#EBFFF8] px-3 py-0.5 text-[10px] font-bold text-[#10B981]">
              Verified
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-extrabold text-[#0F152A]">NIN</h4>
              <p className="text-[11px] text-[#8C909B]">National ID Number</p>
            </div>
            <span className="rounded-full bg-[#EBFFF8] px-3 py-0.5 text-[10px] font-bold text-[#10B981]">
              Verified
            </span>
          </div>

          <div className="flex items-center justify-between py-3 last:pb-0">
            <div>
              <h4 className="font-extrabold text-[#0F152A]">Address</h4>
              <p className="text-[11px] text-[#8C909B]">Proof of address</p>
            </div>
            <span className="rounded-full bg-[#FFFBEB] px-3 py-0.5 text-[10px] font-bold text-[#F59E0B]">
              Pending
            </span>
          </div>
        </div>

        {/* Verification Progress Bar */}
        <div className="rounded-2xl bg-[#F8FAFC] p-4 space-y-2 text-xs">
          <span className="font-bold text-[#0F152A]">✓ 2 of 3 verifications complete</span>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
            <div className="h-full w-[66%] rounded-full bg-[#2563EB]" />
          </div>
          <p className="text-[10px] text-[#8C909B]">
            Complete verification to unlock higher transaction limits
          </p>
        </div>
      </div>

      {/* Card 3: Your Referral */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">Your Referral</h3>

        <div className="rounded-2xl bg-[#0F152A] p-5 text-white shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9DF8DA]">
              REFERRAL CODE
            </span>
            <h2 className="text-2xl font-extrabold tracking-widest text-white mt-0.5">
              {referralCode}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className="rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold text-white hover:bg-white/20"
          >
            Copy
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#0F152A]">
          <span className="rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] px-3.5 py-1.5">
            3 Referred
          </span>
          <span className="rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] px-3.5 py-1.5">
            ₦150K Earned
          </span>
          <span className="rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] px-3.5 py-1.5">
            9 Pending
          </span>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        onOpenChangePhone={() => setChangePhoneOpen(true)}
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
