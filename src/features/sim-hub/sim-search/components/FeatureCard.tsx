import { CARD_COLORS, FEATURE_ICON_COLORS } from "@/constants/colors";

type FeatureCardData = {
  title: string;
  description: string;
  iconColor: string;
  iconBackground: string;
};

const FEATURE_CARDS: FeatureCardData[] = [
  {
    title: "Batch Origin",
    description:
      "Track which batch this SIM came from and who uploaded it to the platform",
    iconColor: FEATURE_ICON_COLORS.blue.icon,
    iconBackground: FEATURE_ICON_COLORS.blue.background,
  },
  {
    title: "Distribution Chain",
    description:
      "See every handoff from Admin to Corp Agent to Agency Partner to Customer",
    iconColor: FEATURE_ICON_COLORS.purple.icon,
    iconBackground: FEATURE_ICON_COLORS.purple.background,
  },
  {
    title: "Customer Detail",
    description:
      "Identify the end customer, their activation status and expiry information",
    iconColor: FEATURE_ICON_COLORS.green.icon,
    iconBackground: FEATURE_ICON_COLORS.green.background,
  },
];

type FeatureCardProps = FeatureCardData;

function FeatureCard({
  title,
  description,
  iconColor,
  iconBackground,
}: FeatureCardProps) {
  return (
    <div
      className="flex items-start gap-4 rounded-md border p-5"
      style={{
        backgroundColor: CARD_COLORS.background,
        borderColor: CARD_COLORS.border,
      }}
    >
      <span
        className="flex size-12 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: iconBackground }}
      >
        <span
          className="size-3.5 rounded-full"
          style={{ backgroundColor: iconColor }}
        />
      </span>

      <div>
        <p
          className="text-[13px] font-bold"
          style={{ color: CARD_COLORS.title }}
        >
          {title}
        </p>
        <p
          className="mt-1 text-[12px] leading-relaxed"
          style={{ color: CARD_COLORS.description }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {FEATURE_CARDS.map((card) => (
        <FeatureCard key={card.title} {...card} />
      ))}
    </div>
  );
}