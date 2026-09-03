import { useState } from "react";
import { Key, Lock, Smartphone } from "lucide-react";
import { ChangePinModal } from "../Modals/ChangePinModal";
import { ChangePasswordModal } from "../Modals/ChangePasswordModal";

export function SecurityPinTab() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorMethod, setTwoFactorMethod] = useState<"SMS" | "Authenticator App">("SMS");

  const [changePinOpen, setChangePinOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Card 1: Transaction PIN */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F152A]">Transaction PIN</h3>
          <button
            type="button"
            onClick={() => setChangePinOpen(true)}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            Change PIN
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
            <Lock className="size-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#0F152A]">PIN is set and active</h4>
            <p className="text-[11px] text-[#8C909B]">Last changed: 1 Jan 2026</p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-4 text-xs space-y-1">
          <span className="font-bold text-[#0F152A] block">Your PIN is required for:</span>
          <ul className="list-disc list-inside text-[#66738C] space-y-0.5 text-[11px]">
            <li>All payments</li>
            <li>Withdrawals</li>
            <li>Account changes</li>
          </ul>
        </div>
      </div>

      {/* Card 2: Account Password */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F152A]">Account Password</h3>
          <button
            type="button"
            onClick={() => setChangePasswordOpen(true)}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            Change Password
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#F59E0B]">
            <Key className="size-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#0F152A]">Password is set</h4>
            <p className="text-[11px] text-[#8C909B]">Last changed: 3 months ago</p>
          </div>
        </div>
      </div>

      {/* Card 3: Two-Factor Authentication (2FA) */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">Two-Factor Authentication (2FA)</h3>

        <div className="flex items-center justify-between border-b border-[#E2ECF6] pb-4">
          <div>
            <h4 className="text-xs font-bold text-[#0F152A]">Enable 2FA</h4>
            <p className="text-[11px] text-[#8C909B]">Add extra security to your account</p>
          </div>

          <button
            type="button"
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              twoFactorEnabled ? "bg-[#10B981]" : "bg-[#E2ECF6]"
            }`}
          >
            <span
              className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                twoFactorEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTwoFactorMethod("SMS")}
              className={`rounded-xl px-5 py-2 font-bold transition ${
                twoFactorMethod === "SMS"
                  ? "border border-[#2563EB] bg-[#EFF4F8] text-[#2563EB]"
                  : "border border-[#E2ECF6] bg-white text-[#8C909B]"
              }`}
            >
              SMS
            </button>
            <button
              type="button"
              onClick={() => setTwoFactorMethod("Authenticator App")}
              className={`rounded-xl px-5 py-2 font-bold transition ${
                twoFactorMethod === "Authenticator App"
                  ? "border border-[#2563EB] bg-[#EFF4F8] text-[#2563EB]"
                  : "border border-[#E2ECF6] bg-white text-[#8C909B]"
              }`}
            >
              Authenticator App
            </button>
          </div>

          <p className="text-[11px] text-[#8C909B]">Your 2FA number: 08065942373</p>
        </div>
      </div>

      {/* Card 4: Active Sessions */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F152A]">Active Sessions</h3>
          <button
            type="button"
            onClick={() => alert("Signed out of all other sessions")}
            className="text-xs font-bold text-[#EF4444] hover:underline"
          >
            Sign out all
          </button>
        </div>

        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white text-xs">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#F8FAFC]">
                <Smartphone className="size-4 text-[#8C909B]" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F152A]">Chrome · Lagos · Current session</h4>
                <span className="text-[10px] font-bold text-[#10B981]">Active now</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#F8FAFC]">
                <Smartphone className="size-4 text-[#8C909B]" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F152A]">Safari · iPhone · Lagos</h4>
                <span className="text-[10px] text-[#8C909B]">2 hours ago</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => alert("Signed out session")}
              className="text-xs font-bold text-[#EF4444] hover:underline"
            >
              Sign out
            </button>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#F8FAFC]">
                <Smartphone className="size-4 text-[#8C909B]" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F152A]">Firefox · Abuja</h4>
                <span className="text-[10px] text-[#8C909B]">Yesterday</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => alert("Signed out session")}
              className="text-xs font-bold text-[#EF4444] hover:underline"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ChangePinModal open={changePinOpen} onOpenChange={setChangePinOpen} />
      <ChangePasswordModal
        open={changePasswordOpen}
        onOpenChange={setChangePasswordOpen}
      />
    </div>
  );
}
