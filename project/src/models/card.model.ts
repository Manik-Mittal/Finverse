export interface Card {
  id: string;
  userId: string;
  cardNumber: string;
  cardType: 'credit' | 'debit';
  cardName: string;
  expiryDate: string;
  cvv: string;
  creditLimit?: number;
  availableCredit?: number;
  isActive: boolean;
  isBlocked: boolean;
  createdAt: string;
}

export interface CardApplication {
  cardType: 'credit' | 'debit';
  cardName: string;
  annualIncome?: number;
  requestedLimit?: number;
}