export type AccountType = {
  id: string;
  name: string;
  eligibility?: string;
  fees?: string;
  interest?: string;
  term?: string;
  monthlyPayment?: number;
}

export type Account = {
  id: string;
  accountNumber: string;
  balance: number;
  accountType: AccountType;
  ledger?: string;
}

export type Customer = {
  id: string;
  name: string;
  tenure: number;
  persona?: string;
  profile?: string;
}

export type Employee = {
  id: string;
  name: string;
  persona?: string;
  profile?: string;
}

export type Department = 'Personal' | 'Business' | 'Loans' | 'Fraud' | 'Wealth' | 'Collections';

export type Lifecycle = 'Opening' | 'Servicing' | 'Closing';

export type TransactionType = 'Payment' | 'Withdrawal' | 'Deposit';

export type Attribute = {
  id: string;
  name: string;
  value: string;
}

export interface CallDriver {
  id: string;
  name: string;
  description: string;
  accountTypes: AccountType[];
  accounts: string[];
  customers: string[];
  employees: string[];
  departments: string[];
  lifecycles: string[];
  transactionTypes: string[];
  attributes: Attribute[];
  selectedPersonas: string[];
}

export type Scenario = {
  id: string;
  name: string;
  outline: string;
  duration: string;
  accountTypes: AccountType[];
  accounts: Account[];
  customers: Customer[];
  employees: Employee[];
  departments: Department[];
  lifecycles: Lifecycle[];
  transactionTypes: TransactionType[];
  callDrivers: CallDriver[];
  attributes: Attribute[];
}

export type LifecycleStage = {
  id: string;
  name: string;
  order: number;
  accountTypeId: string;
} 