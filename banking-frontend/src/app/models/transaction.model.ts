export interface Transaction {
  id: number;
  senderAccount: string;
  receiverAccount: string;
  amount: number;
  transactionTime: string;
  transactionDate: string;
  status: string;
  transactionType: string;
}

export interface DepositRequest {
  senderAccount: string;
  amount: number;
}