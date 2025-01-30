import { AccountType, Account, Customer, Employee, Department, Lifecycle, TransactionType } from '@/types/ontology';

export const mockAccountTypes: AccountType[] = [
  { id: 'at1', name: 'Checking', eligibility: 'All customers' },
  { id: 'at2', name: 'Savings', eligibility: 'All customers' },
  { id: 'at3', name: 'Credit Card', eligibility: 'Credit score > 680' },
];

export const mockAccounts: Account[] = [
  { 
    id: 'acc1', 
    accountNumber: 'CHK-1234',
    balance: 1500.00,
    accountType: mockAccountTypes[0],
  },
  { 
    id: 'acc2',
    accountNumber: 'SAV-5678',
    balance: 5000.00,
    accountType: mockAccountTypes[1],
  },
];

export const mockCustomers: Customer[] = [
  {
    id: 'cust1',
    name: 'John Doe',
    tenure: 5,
    persona: 'Value Seeker',
  },
  {
    id: 'cust2',
    name: 'Jane Smith',
    tenure: 3,
    persona: 'Digital Native',
  },
];

export const mockEmployees: Employee[] = [
  {
    id: 'emp1',
    name: 'Mike Johnson',
    persona: 'Experienced Agent',
  },
  {
    id: 'emp2',
    name: 'Sarah Wilson',
    persona: 'New Hire',
  },
];

export const departments: Department[] = [
  'Personal',
  'Business',
  'Loans',
  'Fraud',
  'Wealth',
  'Collections',
];

export const lifecycles: Lifecycle[] = [
  'Opening',
  'Servicing',
  'Closing',
];

export const transactionTypes: TransactionType[] = [
  'Payment',
  'Withdrawal',
  'Deposit',
]; 