import { useState } from "react";
import { Laptop, Shield, Smartphone } from "lucide-react";

export function LinkedDevicesTab() {
  const [permissions, setPermissions] = useState({
    camera: true,
    location: true,
    contacts: false,
    biometrics: true,
  });

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [devices, setDevices] = useState([
    {
      id: "dev-1",
      name: "iPhone 14 Pro",
      location: "Lagos, Nigeria · Active now",
      current: true,
    },
    {
      id: "dev-2",
      name: "MacBook Pro",
      location: "Lagos, Nigeria · 3 hours ago",
      current: false,
    },
    {
      id: "dev-3",
      name: "Samsung Galaxy A54",
      location: "Abuja, Nigeria · 2 days ago",
      current: false,
    },
  ]);

  const handleRemoveDevice = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id));
  };

  const handleRemoveAll = () => {
    setDevices(devices.filter((d) => d.current));
    alert("All other devices removed.");
  };

  return (
    <div className="space-y-6">
      {/* Card 1: Your Devices */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F152A]">Your Devices</h3>
          <button
            type="button"
            onClick={handleRemoveAll}
            className="text-xs font-bold text-[#EF4444] hover:underline"
          >
            Remove All
          </button>
        </div>

        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white text-xs">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#F8FAFC]">
                  {device.name.includes("iPhone") || device.name.includes("Samsung") ? (
                    <Smartphone className="size-5 text-[#8C909B]" />
                  ) : (
                    <Laptop className="size-5 text-[#8C909B]" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-[#0F152A]">{device.name}</h4>
                    {device.current && (
                      <span className="rounded bg-[#EBFFF8] px-2 py-0.5 text-[9px] font-bold text-[#10B981]">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#8C909B] mt-0.5">{device.location}</p>
                </div>
              </div>

              {!device.current && (
                <button
                  type="button"
                  onClick={() => handleRemoveDevice(device.id)}
                  className="text-xs font-bold text-[#EF4444] hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Card 2: App Permissions */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">App Permissions</h3>

        <div className="divide-y divide-[#E2ECF6] text-xs">
          {[
            { key: "camera", title: "Camera access", desc: "For KYC & document scanning" },
            { key: "location", title: "Location access", desc: "For transaction security" },
            { key: "contacts", title: "Contacts access", desc: "For sending money to contacts" },
            { key: "biometrics", title: "Biometrics", desc: "Face ID / Fingerprint login" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
              <div>
                <h4 className="font-bold text-[#0F152A]">{item.title}</h4>
                <p className="text-[11px] text-[#8C909B]">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => togglePermission(item.key as keyof typeof permissions)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  permissions[item.key as keyof typeof permissions] ? "bg-[#10B981]" : "bg-[#E2ECF6]"
                }`}
              >
                <span
                  className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                    permissions[item.key as keyof typeof permissions] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Device Security Banner */}
      <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-4 text-xs space-y-1">
        <span className="font-bold text-[#0F152A] flex items-center gap-1.5">
          <Shield className="size-4 text-[#F59E0B]" /> Device Security
        </span>
        <p className="text-[#8C909B] text-[11px]">
          If you notice a device you don't recognise, remove it immediately and change your password.
        </p>
      </div>
    </div>
  );
}
