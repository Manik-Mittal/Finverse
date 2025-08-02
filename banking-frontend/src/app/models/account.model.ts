export interface Account {
  accountNumber: string;
  name: string;
  email: string;
  balance: number;
  accountType: string;
  address: string;
  phoneNumber: string;
}

export interface BalanceUpdateRequest {
  accountNumber: string;
  amount: number;
  transactionType: 'deposit' | 'withdraw';
}

export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
}