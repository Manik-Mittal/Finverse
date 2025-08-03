import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Account, Transaction } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private mockAccounts: Account[] = [
    {
      id: '1',
      userId: '1',
      accountNumber: '****1234',
      accountType: 'checking',
      balance: 5420.50,
      currency: 'USD',
      isActive: true,
      createdAt: '2023-01-01T00:00:00Z'
    },
    {
      id: '2',
      userId: '1',
      accountNumber: '****5678',
      accountType: 'savings',
      balance: 15750.25,
      currency: 'USD',
      isActive: true,
      createdAt: '2023-01-01T00:00:00Z'
    }
  ];

  private mockTransactions: Transaction[] = [
    {
      id: '1',
      accountId: '1',
      type: 'debit',
      amount: -45.67,
      description: 'Grocery Store Purchase',
      category: 'Food & Dining',
      date: '2025-01-15T10:30:00Z',
      balance: 5420.50
    },
    {
      id: '2',
      accountId: '1',
      type: 'credit',
      amount: 2500.00,
      description: 'Salary Deposit',
      category: 'Income',
      date: '2025-01-14T09:00:00Z',
      balance: 5466.17
    },
    {
      id: '3',
      accountId: '1',
      type: 'debit',
      amount: -120.00,
      description: 'Utility Bill Payment',
      category: 'Bills & Utilities',
      date: '2025-01-13T14:15:00Z',
      balance: 2966.17
    }
  ];

  getAccounts(userId: string): Observable<Account[]> {
    return of(this.mockAccounts.filter(account => account.userId === userId)).pipe(delay(500));
  }

  getAccountById(accountId: string): Observable<Account | undefined> {
    return of(this.mockAccounts.find(account => account.id === accountId)).pipe(delay(300));
  }

  getTransactions(accountId: string): Observable<Transaction[]> {
    return of(this.mockTransactions.filter(transaction => transaction.accountId === accountId)).pipe(delay(500));
  }

  transferFunds(fromAccountId: string, toAccountId: string, amount: number, description: string): Observable<boolean> {
    // Simulate API call for fund transfer
    return of(true).pipe(delay(1000));
  }

  getAccountBalance(accountId: string): Observable<number> {
    const account = this.mockAccounts.find(acc => acc.id === accountId);
    return of(account?.balance || 0).pipe(delay(300));
  }
}