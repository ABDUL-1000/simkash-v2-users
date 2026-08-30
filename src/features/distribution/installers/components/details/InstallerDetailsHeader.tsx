import { EntityDetailsHeader } from "@/components/common/EntityDetailsHeader";

type InstallerDetailsHeaderProps = {
  name?: string;
  phone?: string;
  location?: string;
  role?: string;
  onAssignJob?: () => void;
  onSuspend?: () => void;
};

export function InstallerDetailsHeader({
  name = "Emeka Obi",
  phone = "08163083409",
  location = "Lagos",
  role = "Installer",
  onAssignJob,
  onSuspend,
}: InstallerDetailsHeaderProps) {
  return (
    <EntityDetailsHeader
      name={name}
      phone={phone}
      location={location}
      role={role}
      avatarInitials="EO"
      avatarBg="#2563EB"
      badges={[
        { label: "CCTV", variant: "info" },
        { label: "Solar", variant: "warning" },
        { label: "Top Performer", variant: "amber" },
        { label: "Active", variant: "success" },
      ]}
      actions={[
        {
          key: "assign-job",
          label: "Assign Job",
          variant: "primary",
          onClick: onAssignJob,
        },
        {
          key: "suspend",
          label: "Suspend",
          variant: "danger",
          onClick: onSuspend,
        },
      ]}
    />
  );
}
