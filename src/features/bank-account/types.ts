export interface Bank {
  code: string;
  name: string;
}

export interface VerifyBankAccountPayload {
  account_number: string;
  bank_code: string;
}

export interface VerifiedBankAccount {
  account_number: string;
  account_name: string;
  bank_code: string;
}

/** Verified bank details — the common shape every dashboard's "save payout account" endpoint accepts. */
export interface BankAccountDetails extends VerifiedBankAccount {
  bank_name: string;
}
