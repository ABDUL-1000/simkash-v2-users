import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Phone,
  User,
  MoreHorizontal,
  RotateCcw,
  UserPlus,
  ArrowRightLeft,
  ShieldBan,
} from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { appPaths } from "@/app/router/paths";
import type { StateCoordinatorItem } from "../../types/regional-manager.types";

interface RmScCardProps {
  sc: StateCoordinatorItem;
  onDistribute: (sc: StateCoordinatorItem) => void;
  onContact: (sc: StateCoordinatorItem) => void;
  onReactivate: (sc: StateCoordinatorItem) => void;
  onOnboardAp?: (sc: StateCoordinatorItem) => void;
  onSuspend?: (sc: StateCoordinatorItem) => void;
  onRedistribute?: (sc: StateCoordinatorItem) => void;
}

export function RmScCard({
  sc,
  onDistribute,
  onContact,
  onReactivate,
  onOnboardAp,
  onSuspend,
  onRedistribute,
}: RmScCardProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isSuspended = sc.status === "Suspended";
  const isAtRisk = sc.status === "At Risk";

  const distributed = sc.distributedSims ?? Math.round(sc.stock * 1.5);
  const totalAlloc = sc.totalAllocatedSims ?? Math.max(distributed, 100);
  const percent = totalAlloc > 0 ? Math.min(100, Math.round((distributed / totalAlloc) * 100)) : 0;

  const borderColor = isSuspended
    ? APP_COLORS.reds.red
    : isAtRisk
    ? APP_COLORS.ambers.amber
    : APP_COLORS.greys.stroke;

  const statusColor = isSuspended
    ? APP_COLORS.reds.red
    : isAtRisk
    ? APP_COLORS.ambers.amber
    : APP_COLORS.greens.green;

  const statusBg = isSuspended
    ? APP_COLORS.reds.light
    : isAtRisk
    ? APP_COLORS.ambers.light
    : APP_COLORS.greens.light;

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs transition hover:shadow-sm"
      style={{
        borderColor,
        backgroundColor: APP_COLORS.backgrounds.background,
      }}
    >
      {/* 1. Header: Avatar + Info + Status */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-black"
            style={{
              backgroundColor: APP_COLORS.blues.surfaceLight,
              color: APP_COLORS.blues.interactiveCta,
            }}
          >
            {sc.initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3
                className="text-sm font-bold tracking-tight truncate cursor-pointer hover:underline"
                style={{ color: APP_COLORS.texts.primary }}
                onClick={() => navigate(appPaths.rmScDetails(sc.id).path)}
              >
                {sc.name}
              </h3>
            </div>
            <div
              className="flex items-center gap-1.5 text-[11px] mt-0.5"
              style={{ color: APP_COLORS.texts.slate }}
            >
              <span className="font-semibold">{sc.code || "SC-SW-001"}</span>
              <span>·</span>
              <span>Since {sc.sinceDate || sc.onboardedOn || "Jan 2026"}</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold shrink-0"
          style={{
            backgroundColor: statusBg,
            color: statusColor,
          }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: statusColor }}
          />
          <span>{sc.status || "Active"}</span>
        </div>
      </div>

      {/* 2. Four Metrics Grid */}
      <div
        className="mt-3.5 grid grid-cols-2 gap-2 rounded-xl p-3 sm:grid-cols-4"
        style={{ backgroundColor: APP_COLORS.backgrounds.surface }}
      >
        {/* Activations */}
        <div>
          <span
            className="text-[10px] font-bold uppercase tracking-wider block"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Activations
          </span>
          <span
            className="text-base font-black block mt-0.5"
            style={{ color: APP_COLORS.texts.primary }}
          >
            {sc.activationsCount.toLocaleString()}
          </span>
        </div>

        {/* APs */}
        <div>
          <span
            className="text-[10px] font-bold uppercase tracking-wider block"
            style={{ color: APP_COLORS.texts.slate }}
          >
            APs
          </span>
          <span
            className="text-base font-black block mt-0.5"
            style={{ color: APP_COLORS.texts.primary }}
          >
            {sc.apsCount}
          </span>
        </div>

        {/* Total Sales */}
        <div>
          <span
            className="text-[10px] font-bold uppercase tracking-wider block"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Total Sales
          </span>
          <span
            className="text-base font-black block mt-0.5"
            style={{ color: APP_COLORS.texts.primary }}
          >
            {sc.totalSales || `₦${(sc.activationsCount * 1000).toLocaleString()}`}
          </span>
        </div>

        {/* Bonus Earned */}
        <div>
          <span
            className="text-[10px] font-bold uppercase tracking-wider block"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Bonus Earned
          </span>
          <span
            className="text-base font-black block mt-0.5"
            style={{
              color: isSuspended ? APP_COLORS.texts.slate : APP_COLORS.blues.interactiveCta,
            }}
          >
            {sc.bonusEarned || (isSuspended ? "₦0" : "+₦25,000")}
          </span>
        </div>
      </div>

      {/* 3. SIM Distribution Progress Bar */}
      <div className="mt-3 space-y-1">
        <div
          className="flex justify-between text-[11px] font-medium"
          style={{ color: APP_COLORS.texts.slate }}
        >
          <span>
            {distributed} of {totalAlloc} SIMs distributed ({percent}%)
          </span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: APP_COLORS.greys.stroke }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${percent}%`,
              backgroundColor: isSuspended
                ? APP_COLORS.reds.red
                : isAtRisk
                ? APP_COLORS.ambers.amber
                : APP_COLORS.blues.interactiveCta,
            }}
          />
        </div>
      </div>

      {/* 4. Action Links Footer */}
      <div
        className="mt-3.5 flex items-center justify-between border-t pt-2.5 text-xs"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="flex flex-wrap items-center gap-4 font-bold">
          {/* View Profile */}
          <button
            type="button"
            onClick={() => navigate(appPaths.rmScDetails(sc.id).path)}
            className="inline-flex items-center gap-1.5 hover:underline cursor-pointer"
            style={{ color: APP_COLORS.blues.interactiveCta }}
          >
            <User className="size-3.5" />
            <span>View Profile</span>
          </button>

          {/* Distribute or Reactivate */}
          {isSuspended ? (
            <button
              type="button"
              onClick={() => onReactivate(sc)}
              className="inline-flex items-center gap-1.5 hover:underline cursor-pointer"
              style={{ color: APP_COLORS.reds.red }}
            >
              <RotateCcw className="size-3.5" />
              <span>Reactivate</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onDistribute(sc)}
              className="inline-flex items-center gap-1.5 hover:underline cursor-pointer"
              style={{ color: APP_COLORS.greens.green }}
            >
              <Send className="size-3.5" />
              <span>Distribute</span>
            </button>
          )}

          {/* Contact */}
          <button
            type="button"
            onClick={() => onContact(sc)}
            className="inline-flex items-center gap-1.5 hover:underline cursor-pointer"
            style={{ color: APP_COLORS.ambers.secondary }}
          >
            <Phone className="size-3.5" />
            <span>Contact</span>
          </button>
        </div>

        {/* More Options Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-lg p-1 hover:bg-slate-100 transition cursor-pointer"
            style={{ color: APP_COLORS.texts.slate }}
            title="More options"
          >
            <MoreHorizontal className="size-4" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div
                className="absolute right-0 bottom-7 z-20 w-48 rounded-xl border bg-white p-1 shadow-lg text-xs"
                style={{ borderColor: APP_COLORS.greys.stroke }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOnboardAp?.(sc);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 font-semibold hover:bg-slate-50 cursor-pointer text-left"
                  style={{ color: APP_COLORS.texts.primary }}
                >
                  <UserPlus className="size-3.5 text-blue-600" />
                  <span>Onboard AP</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onRedistribute?.(sc);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 font-semibold hover:bg-slate-50 cursor-pointer text-left"
                  style={{ color: APP_COLORS.texts.primary }}
                >
                  <ArrowRightLeft className="size-3.5 text-indigo-600" />
                  <span>Redistribute Stock</span>
                </button>

                {isSuspended ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onReactivate(sc);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 font-semibold hover:bg-slate-50 cursor-pointer text-left"
                    style={{ color: APP_COLORS.greens.green }}
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Reactivate SC</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onSuspend?.(sc);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 font-semibold hover:bg-red-50 cursor-pointer text-left"
                    style={{ color: APP_COLORS.reds.red }}
                  >
                    <ShieldBan className="size-3.5" />
                    <span>Suspend Account</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RmScCard;
