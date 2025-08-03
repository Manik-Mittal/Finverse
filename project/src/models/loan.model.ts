export interface Loan {
  id: string;
  userId: string;
  loanType: 'personal' | 'home' | 'auto' | 'business';
  amount: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  remainingBalance: number;
  status: 'pending' | 'approved' | 'active' | 'paid' | 'rejected';
  applicationDate: string;
  approvalDate?: string;
  nextPaymentDate?: string;
}

export interface LoanApplication {
  loanType: 'personal' | 'home' | 'auto' | 'business';
  amount: number;
  termMonths: number;
  purpose: string;
  annualIncome: number;
  employmentStatus: string;
}