export type JobLifecycleStatus =
  | "Assigned"
  | "In Progress"
  | "Pending Verification"
  | "Completed"
  | "Disputed"
  | "On Hold";

export interface EquipmentItem {
  id: string;
  name: string;
  quantity: number;
  installed?: boolean;
}

export interface ClientDetails {
  company: string;
  category?: string;
  contactName: string;
  phone: string;
  email: string;
  address: string;
  nearestLandmark?: string;
}

export interface JobProgressStep {
  step: number;
  title: string;
  description: string;
  status: "pending" | "current" | "completed";
  timestamp?: string;
}

export interface CompletionChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface CompletedJobItem {
  id: string;
  reference: string;
  title: string;
  category: "Solar CCTV" | "CCTV Only" | "Solar Only" | "Repair";
  client: string;
  location: string;
  completedDateText: string;
  fee: number;
  rating: number;
}

export interface DisputedJobItem {
  id: string;
  reference: string;
  title: string;
  fee: number;
  client: string;
  location: string;
  disputeReason: string;
  clientClaim: string;
  clientClaimDate: string;
  installerResponse: string;
  timeline: {
    title: string;
    date: string;
    status: "done" | "in_progress" | "pending";
  }[];
}

export interface JobDetailItem {
  id: string;
  reference: string;
  title: string;
  type: string;
  status: JobLifecycleStatus;
  fee: number;
  assignedDate: string;
  assignedDaysAgo: string;
  dueDate: string;
  dueDaysRemaining: string;
  isUrgent?: boolean;
  distanceKm: number;
  assignedBy: string;
  client: ClientDetails;
  description: string;
  progressPercent: number;
  equipment: EquipmentItem[];
  adminNotes: string;
  progressSteps: JobProgressStep[];
  completionChecklist: CompletionChecklistItem[];
  uploadedPhotosCount: number;
  photos: { id: string; url: string; label: string }[];
  verificationSubmittedAt?: string;
  clientVerified?: boolean;
  adminVerified?: boolean;
  isEasyBuy?: boolean;
  easyBuyPlan?: EasyBuyPlanDetails;
}

export interface EasyBuyPaymentRecord {
  id: string;
  date: string;
  amount: number;
  status: "Paid" | "Today" | "Upcoming" | "Missed";
}

export interface EasyBuyPlanDetails {
  planId: string;
  product: string;
  productValue: number;
  downPayment: number;
  installmentRate: string;
  planType?: string;
  planStatus: "Active" | "Missed" | "Completed" | "Cancelled";
  planProgress: number;
  amountPaid: number;
  amountRemaining: number;
  commissionAmount: number;
  commissionRate: string;
  commissionStatus: "Pending" | "Paid" | "Delayed" | "Cancelled";
  estimatedCompletionDate?: string;
  daysRemaining?: number;
  customerName?: string;
  customerPhone?: string;
  recentPayments: EasyBuyPaymentRecord[];
  recoveryStatus?: {
    smsSent: boolean;
    adminCall: boolean;
    accountSuspended: boolean;
  };
}

export interface EasyBuyCommissionRecord {
  id: string;
  jobRef: string;
  jobTitle: string;
  client: string;
  product: string;
  productValue: number;
  jobFee: number;
  jobFeePaid: boolean;
  commissionAmount: number;
  commissionRate: string;
  planStatusText: string;
  planProgress: number;
  amountPaidText: string;
  commissionStatus: "Pending" | "Paid" | "Delayed" | "Cancelled";
  plan: EasyBuyPlanDetails;
  delayReason?: string;
  cancellationReason?: string;
}
