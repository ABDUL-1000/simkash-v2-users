export type JobStatus = "Assigned" | "In Progress" | "Completed" | "Pending Verification" | "Disputed";

export interface InstallerJob {
  id: string;
  reference: string;
  title: string;
  client: string;
  clientType?: string;
  locationArea: string;
  address: string;
  dueDate: string;
  dueDaysText: string;
  isUrgent?: boolean;
  assignedDateText: string;
  equipment: string[];
  progressPercent?: number;
  status: JobStatus;
  payoutAmount: number;
}

export interface InstallerCompletedJob {
  id: string;
  date: string;
  jobRef: string;
  title: string;
  client: string;
  rating: number;
  fee: number;
}

export interface InstallerReview {
  id: string;
  company: string;
  clientType: string;
  jobRef: string;
  rating: number;
  timeAgo: string;
  comment: string;
  fee: number;
  avatarLetter: string;
}

export interface UpcomingDeadline {
  id: string;
  jobRef: string;
  title: string;
  location: string;
  dueDateText: string;
  urgency: "urgent" | "moderate" | "normal";
}

export interface ActivityFeedItem {
  id: string;
  type: "assigned" | "completed" | "verification" | "dispute" | "review";
  title: string;
  details: string;
  timeAgo: string;
}

export interface InstallerStats {
  activeJobsCount: number;
  activeJobsPotential: number;
  completedThisMonth: number;
  completedAllTime: number;
  pendingVerificationCount: number;
  pendingVerificationAmount: number;
  totalEarnings: number;
  thisMonthEarnings: number;
  lastMonthEarnings: number;
  pendingEarnings: number;
  avgRating: number;
  totalReviews: number;
  bonusCompletedCount: number;
  bonusTargetCount: number;
  bonusReward: number;
}
