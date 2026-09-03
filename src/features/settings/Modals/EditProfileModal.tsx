import { useState } from "react";
import {  Camera } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenChangePhone?: () => void;
}

export function EditProfileModal({
  open,
  onOpenChange,
  onOpenChangePhone,
}: EditProfileModalProps) {
  const [fullName, setFullName] = useState("Yusuf Adam Baba");
  const [phone] = useState("08065942373");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("1990-06-24");
  const [state, setState] = useState("Lagos");
  const [lga, setLga] = useState("Ikeja");
  const [address, setAddress] = useState("23 Allen Avenue, Ikeja");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    alert("Profile details updated!");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Profile"
      description="Update your personal information"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Avatar & Upload Dropzone */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#2563EB] text-xl font-extrabold text-white shadow-md">
            YA
          </div>
          <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline block mx-auto">
            Change Photo
          </button>

          <div className="rounded-2xl border-2 border-dashed border-[#E2ECF6] bg-[#F8FAFC] p-4 text-center space-y-1 cursor-pointer hover:border-[#2563EB]">
            <Camera className="mx-auto size-5 text-[#8C909B]" />
            <p className="text-xs font-bold text-[#0F152A]">Tap to upload photo</p>
            <p className="text-[10px] text-[#8C909B]">JPG or PNG · Max 5MB</p>
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Full Name</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Phone Number</label>
          <div className="relative">
            <input
              type="text"
              readOnly
              value={phone}
              className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none"
            />
          </div>
          <div className="rounded-xl bg-[#FFFBEB] p-2 text-[10px] font-bold text-[#D9990D] border border-[#FCEEC1] flex items-center justify-between">
            <span>Changing phone requires OTP verification</span>
            {onOpenChangePhone && (
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onOpenChangePhone();
                }}
                className="text-[#2563EB] hover:underline"
              >
                Change →
              </button>
            )}
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Date of Birth</label>
          <div className="relative">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        {/* State */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          >
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Kano">Kano</option>
            <option value="Rivers">Rivers</option>
          </select>
        </div>

        {/* LGA */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">LGA</label>
          <input
            type="text"
            value={lga}
            onChange={(e) => setLga(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Address */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Address (optional)</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </AppModal>
  );
}
