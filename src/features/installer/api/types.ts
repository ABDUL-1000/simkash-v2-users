// Installer API contracts (/installer/*). Fields are read defensively in the UI.
export interface Pagination { page: number; limit: number; total: number; totalPages: number; hasNextPage?: boolean; hasPrevPage?: boolean }

export type JobStatus = "assigned" | "en_route" | "in_progress" | "pending_verification" | "disputed" | "completed" | "failed" | "cancelled";
export interface JobActions {
  canStart?: boolean; canMarkEnRoute?: boolean; canUpdateProgress?: boolean; canEditChecklist?: boolean; canUploadPhotos?: boolean;
  canSubmit?: boolean; canHold?: boolean; canResume?: boolean; canReportIssue?: boolean; canFail?: boolean;
}
export interface JobClient { company: string | null; type: string | null; contactName: string | null; phone: string | null; email: string | null }
export interface InstallerJob {
  id: number; jobNumber: string; source: "marketplace" | "direct";
  title: string | null; jobType: { id: number; name: string } | null;
  orderId: number | null; orderNumber: string | null;
  status: JobStatus; statusLabel: string; onHold: boolean; holdReason: string | null;
  progressStep: number; scheduledDate: string | null; dateLabel: string | null; slot: string | null; slotLabel: string | null;
  deadline: string | null; isOverdue?: boolean; address: string | null; area: string | null; landmark: string | null;
  client: JobClient; items: { equipmentId: number; productId: number | null; name: string; modelNumber: string | null; quantity: number; isInstalled: boolean }[];
  payAmount: number | null; photoCount?: number; actions?: JobActions;
  startedAt: string | null; submittedAt: string | null; completedAt: string | null; paidAt: string | null;
}
export interface Verification {
  stage: "awaiting_client" | "awaiting_admin" | "disputed" | "verified";
  submittedAt: string | null; clientRespondBy: string | null; clientVerifiedAt: string | null; clientVerifiedBy: string | null;
  canRemind: boolean; nextReminderAt: string | null; heldAmount: number | null; paidAmount: number | null; paidAt: string | null;
}
export interface Dispute {
  id: number; status: "open" | "resolved"; reason: string; raisedBy: "customer" | "simkash";
  installerResponse: string | null; respondedAt: string | null; awaitingInstallerResponse: boolean;
  resolution: "release" | "rework" | "reduce_pay" | "cancel" | null; resolutionLabel: string | null;
  resolvedAmount: number | null; resolutionNote: string | null; resolvedAt: string | null; createdAt: string;
  job: { id: number; jobNumber: string; title: string | null; jobType: { id: number; name: string } | null; source: string; status: JobStatus; client: JobClient; orderNumber: string | null; address: string | null; payAmount: number | null; paidAmount: number | null; submittedAt: string | null };
  evidence?: { photos: { id: number; url: string; caption: string | null }[]; checklist: { id: number; label: string; isChecked: boolean }[] };
}

export interface DashboardData {
  greeting: { name: string; fullName: string; dateLabel: string };
  kpis: {
    activeJobs: { count: number; inProgress: number; onHold: number; potentialEarnings: number; payNotSet: number };
    completed: { thisMonth: number; lastMonth: number; changePercent: number | null };
    pendingVerification: { count: number; heldAmount: number };
    earnings: { thisMonth: number; lastMonth: number; changePercent: number | null; total: number; availableBalance: number };
    rating: { average: number | null; count: number };
  };
  cards: { todayJobs: number; overdue: number; disputesAwaitingResponse: number };
  activeJobs: InstallerJob[];
  pendingVerification: (InstallerJob & { verification: Verification })[];
  disputes: Dispute[];
  recentlyCompleted: { id: number; jobNumber: string; title: string | null; client: JobClient | string | null; completedAt: string | null; paidAmount: number | null; rating: number | { rating: number } | null }[];
  upcomingDeadlines: { id: number; jobNumber: string; title: string | null; client: JobClient | string | null; status: JobStatus; onHold: boolean; deadline: string; daysLeft: number; urgency: "overdue" | "today" | "soon" | "ok" }[];
  activity: { id: number; event: string; note: string | null; actor: string | null; job: { id: number; jobNumber: string; title: string | null } | null; at: string }[];
}

export type JobsTab = "all" | "assigned" | "in_progress" | "on_hold" | "pending_verification" | "completed";
export interface JobsData { tabCounts: Record<JobsTab, number>; jobs: InstallerJob[]; pagination: Pagination }

export interface JobDetail extends InstallerJob {
  description: string | null; adminNotes: string | null; holdBy: "installer" | "admin" | null; heldAt: string | null;
  progress: { currentStep: number; steps: { step: number; key: string; label: string; done: boolean; current: boolean }[] };
  equipment: { id: number; name: string; quantity: number; productId: number | null; isInstalled: boolean; installedAt: string | null }[];
  checklist: { id: number; label: string; isRequired: boolean; isChecked: boolean; checkedAt: string | null }[];
  photos: { id: number; url: string; caption: string | null; createdAt: string }[];
  readiness: { checklistTotal: number; checklistDone: number; requiredRemaining: number; photos: number; minPhotos: number; maxPhotos: number; equipmentTotal: number; equipmentInstalled: number; canSubmit: boolean; blockers: string[] };
  actions: JobActions;
  timeline: { id: number; event: string; note: string | null; actorType: string | null; at: string }[];
}
export type IssueCategory = "equipment_missing" | "equipment_faulty" | "site_not_ready" | "client_unavailable" | "access_denied" | "safety" | "other";

export interface VerificationData { summary: { total: number; awaitingClient: number; awaitingAdmin: number; disputed: number; heldAmount: number; payNotSet: number }; jobs: (InstallerJob & { verification: Verification; waitingHours: number })[]; pagination: Pagination }
export interface DisputesData { summary: { open: number; awaitingResponse: number; resolved: number; heldAmount: number }; disputes: Dispute[]; pagination: Pagination }
export interface CompletedData {
  totals: { jobs: number; totalEarned: number; averagePay: number; averageRating: number | null; ratedJobs: number; onTimeRate: number | null };
  monthlyEarnings: { month: string; label: string; jobs: number; earned: number }[];
  jobTypeBreakdown: { jobTypeId: number; name: string; jobs: number; earned: number; percent: number }[];
  jobs: (InstallerJob & { paidAmount: number | null; rating: { rating: number; comment: string | null } | null; onTime: boolean | null; durationHours: number | null })[];
  pagination: Pagination;
}
export interface ReviewsData {
  summary: { average: number | null; count: number; withComments: number; thisMonth: { count: number; average: number | null }; breakdown: { stars: number; count: number; percent: number }[] };
  reviews: { id: number; rating: number; comment: string | null; reviewer: string; reviewerType: "customer" | "company"; recordedBySimkash: boolean; job: { id: number; jobNumber: string; title: string | null; jobType: { name: string } | null; completedAt: string | null }; createdAt: string }[];
  pagination: Pagination;
}
export interface PayoutAccount { id: number; bankName: string; bankCode: string; accountNumberMasked: string; accountName: string }
export interface WalletData {
  availableBalance: number; withdrawable: number; pendingVerification: { amount: number; jobs: number; note: string | null };
  totalEarned: number; jobsPaid: number; thisMonth: { amount: number; lastMonth: number; changePercent: number | null };
  bestMonth: { month: string; label: string; amount: number } | null; monthlyEarnings: { month: string; label: string; amount: number }[];
  payouts: { totalPaidOut: number; count: number; pendingAmount: number; pendingCount: number; feesPaid: number };
  payoutAccount: PayoutAccount | null; rules: { minPayout: number; transferFee: number };
}
export interface WalletTransaction { id: number; kind: string; direction: "credit" | "debit"; amount: number; signedAmount: number; status: string; description: string | null; jobNumber: string | null; balanceAfter: number | null; createdAt: string }
export interface PayoutRecord { id: number; reference: string; amount: number; fee: number; status: string; bankAccount: PayoutAccount | null; failureReason: string | null; requestedAt: string; processedAt: string | null }
