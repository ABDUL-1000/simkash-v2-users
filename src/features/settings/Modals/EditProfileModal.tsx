import { useState, useEffect } from "react";
import { Camera, Loader2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { useUpdateProfile } from "../api/useUpdateProfile";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenChangePhone?: () => void;
  initialData?: {
    fullname?: string;
    phone?: string;
    gender?: string;
    country?: string;
    profile_picture?: string;
  };
}

export function EditProfileModal({
  open,
  onOpenChange,
  onOpenChangePhone,
  initialData,
}: EditProfileModalProps) {
  const [fullName, setFullName] = useState(initialData?.fullname || "");
  const [gender, setGender] = useState(initialData?.gender || "Male");
  const [country, setCountry] = useState(initialData?.country || "Nigeria");

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullname || "");
      setGender(initialData.gender ? initialData.gender.charAt(0).toUpperCase() + initialData.gender.slice(1).toLowerCase() : "Male");
      setCountry(initialData.country || "Nigeria");
    }
  }, [initialData, open]);

  const { mutate: updateProfile, isPending } = useUpdateProfile({
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullname: fullName,
      gender: gender.toLowerCase(),
      country,
    });
  };

  const initials = fullName
    ? fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Profile"
      description="Update your personal account information"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Avatar & Upload Dropzone */}
        <div className="text-center space-y-3">
          {initialData?.profile_picture ? (
            <img
              src={initialData.profile_picture}
              alt={fullName}
              className="mx-auto size-20 rounded-full object-cover shadow-md border-2 border-white ring-2 ring-[#2563EB]/20"
            />
          ) : (
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#2563EB] text-xl font-extrabold text-white shadow-md">
              {initials}
            </div>
          )}

          <div className="rounded-2xl border-2 border-dashed border-[#E2ECF6] bg-[#F8FAFC] p-4 text-center space-y-1 cursor-pointer hover:border-[#2563EB] transition">
            <Camera className="mx-auto size-5 text-[#8C909B]" />
            <p className="text-xs font-bold text-[#0F152A]">Profile Photo</p>
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
            placeholder="e.g. John Doe"
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition"
          />
        </div>

        {/* Phone Number (Read-only with OTP change option) */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Phone Number</label>
          <div className="relative">
            <input
              type="text"
              readOnly
              value={initialData?.phone || "No phone linked"}
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
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB] transition"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Country */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB] transition"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1.5 transition"
          >
            {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </AppModal>
  );
}
