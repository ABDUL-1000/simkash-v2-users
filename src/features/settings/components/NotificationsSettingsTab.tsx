import { useState } from "react";

export function NotificationsSettingsTab() {
  const [push, setPush] = useState({
    transactionAlerts: true,
    simRenewalReminders: true,
    promotionalOffers: false,
    referralUpdates: true,
  });

  const [sms, setSms] = useState({
    transactionConfirmations: true,
    otpDelivery: true,
    marketingMessages: false,
  });

  const [email, setEmail] = useState({
    monthlyStatements: true,
    receipts: true,
    productUpdates: false,
    securityAlerts: true,
  });

  const [renewalReminder, setRenewalReminder] = useState("7 days before");

  const togglePush = (key: keyof typeof push) => setPush({ ...push, [key]: !push[key] });
  const toggleSms = (key: keyof typeof sms) => setSms({ ...sms, [key]: !sms[key] });
  const toggleEmail = (key: keyof typeof email) => setEmail({ ...email, [key]: !email[key] });

  return (
    <div className="space-y-6">
      {/* Card 1: Push Notifications */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">Push Notifications</h3>

        <div className="divide-y divide-[#E2ECF6] text-xs">
          {[
            { key: "transactionAlerts", title: "Transaction alerts", desc: "Get notified for every payment" },
            { key: "simRenewalReminders", title: "SIM renewal reminders", desc: "7 days before expiry" },
            { key: "promotionalOffers", title: "Promotional offers", desc: "Deals and new features" },
            { key: "referralUpdates", title: "Referral updates", desc: "When referrals make purchases" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <h4 className="font-bold text-[#0F152A]">{item.title}</h4>
                <p className="text-[11px] text-[#8C909B]">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => togglePush(item.key as keyof typeof push)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  push[item.key as keyof typeof push] ? "bg-[#10B981]" : "bg-[#E2ECF6]"
                }`}
              >
                <span
                  className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                    push[item.key as keyof typeof push] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Card 2: SMS Notifications */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">SMS Notifications</h3>

        <div className="divide-y divide-[#E2ECF6] text-xs">
          {[
            { key: "transactionConfirmations", title: "Transaction confirmations", desc: "SMS for every debit/credit" },
            { key: "otpDelivery", title: "OTP delivery", desc: "Security codes via SMS" },
            { key: "marketingMessages", title: "Marketing messages", desc: "Offers and campaigns" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <h4 className="font-bold text-[#0F152A]">{item.title}</h4>
                <p className="text-[11px] text-[#8C909B]">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleSms(item.key as keyof typeof sms)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  sms[item.key as keyof typeof sms] ? "bg-[#10B981]" : "bg-[#E2ECF6]"
                }`}
              >
                <span
                  className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                    sms[item.key as keyof typeof sms] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Card 3: Email Notifications */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">Email Notifications</h3>

        <div className="divide-y divide-[#E2ECF6] text-xs">
          {[
            { key: "monthlyStatements", title: "Monthly statements", desc: "Account summary every month" },
            { key: "receipts", title: "Receipts", desc: "Email receipt for each payment" },
            { key: "productUpdates", title: "Product updates", desc: "New features & changes" },
            { key: "securityAlerts", title: "Security alerts", desc: "Login from new device" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <h4 className="font-bold text-[#0F152A]">{item.title}</h4>
                <p className="text-[11px] text-[#8C909B]">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleEmail(item.key as keyof typeof email)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  email[item.key as keyof typeof email] ? "bg-[#10B981]" : "bg-[#E2ECF6]"
                }`}
              >
                <span
                  className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                    email[item.key as keyof typeof email] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Card 4: Renewal Reminders Radio Group */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">Renewal Reminders</h3>

        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] text-xs">
          {["7 days before", "3 days before", "1 day before", "On expiry day"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 p-3.5 px-4 cursor-pointer hover:bg-[#F8FAFC]"
            >
              <input
                type="radio"
                name="renewal_reminder"
                checked={renewalReminder === option}
                onChange={() => setRenewalReminder(option)}
                className="size-4 accent-[#2563EB]"
              />
              <span className="font-bold text-[#0F152A]">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
