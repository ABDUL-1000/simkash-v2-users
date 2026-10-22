export type ApplicationRole = "partner" | "state";

export interface ApplicationRoleOption {
  role: ApplicationRole;
  title: string;
  description: string;
  benefits: string[];
  requirements: string[];
}

export interface ApplicationOptions {
  roles: ApplicationRoleOption[];
  states: string[];
  genders: string[];
}

interface ApplicationBase {
  fullname: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  country: string;
  state: string;
  lga: string;
  address: string;
  reason: string;
  idCard?: string;
  referred_by?: number;
}
export interface PartnerApplicationPayload extends ApplicationBase {
  business_name?: string;
  estimated_monthly_volume?: string;
}
export interface StateCoordinatorApplicationPayload extends ApplicationBase {
  experience?: string;
  coverage_area?: string;
}

export interface AgentApplication {
  id: number;
  role: ApplicationRole;
  role_label: string;
  status: string;
  status_label: string;
  fullname: string;
  email: string;
  phone: string;
  state: string;
  lga: string;
  address: string;
  reason: string;
  referred_by?: number | null;
  createdAt: string;
  createdAt_formatted: string;
  updatedAt?: string;
}

/** POST /user/partner/apply and /user/state-coordinator/apply. */
export interface ApplicationSubmitResult extends Omit<AgentApplication, "id"> {
  application_id: number;
  user_id: number;
}

export interface ApplicationStatus {
  has_applied_partner: boolean;
  has_applied_state_coordinator: boolean;
  partner_status: string;
  state_coordinator_status: string;
  partner_application: AgentApplication | null;
  state_coordinator_application: AgentApplication | null;
  applications: AgentApplication[];
}
