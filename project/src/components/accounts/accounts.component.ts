import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account.service';
import { Account, Transaction } from '../../models/account.model';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="accounts-container">
      <div class="header">
        <h1>My Accounts</h1>
        <p>Manage your banking accounts and view transactions</p>
      </div>

      <div class="accounts-grid">
        <div *ngFor="let account of accounts" class="account-card" (click)="selectAccount(account)">
          <div class="account-header">
            <div class="account-type">
              <span class="account-icon">{{ getAccountIcon(account.accountType) }}</span>
              <div>
                <h3>{{ account.accountType | titlecase }} Account</h3>
                <p class="account-number">{{ account.accountNumber }}</p>
              </div>
            </div>
            <div class="account-status" [class.active]="account.isActive">
              {{ account.isActive ? 'Active' : 'Inactive' }}
            </div>
          </div>
          <div class="account-balance">
            <span class="balance-label">Available Balance</span>
            <span class="balance-amount">{{ account.balance | currency:'USD':'symbol':'1.2-2' }}</span>
          </div>
        </div>
      </div>

      <div *ngIf="selectedAccount" class="transactions-section">
        <div class="section-header">
          <h2>Recent Transactions - {{ selectedAccount.accountType | titlecase }} Account</h2>
          <span class="account-number">{{ selectedAccount.accountNumber }}</span>
        </div>

        <div class="transactions-list">
          <div *ngFor="let transaction of transactions" class="transaction-item">
            <div class="transaction-icon" [class.credit]="transaction.type === 'credit'" [class.debit]="transaction.type === 'debit'">
              {{ transaction.type === 'credit' ? '↑' : '↓' }}
            </div>
            <div class="transaction-details">
              <h4>{{ transaction.description }}</h4>
              <p class="transaction-category">{{ transaction.category }}</p>
              <small class="transaction-date">{{ transaction.date | date:'MMM dd, yyyy HH:mm' }}</small>
            </div>
            <div class="transaction-amount" [class.credit]="transaction.type === 'credit'" [class.debit]="transaction.type === 'debit'">
              <span class="amount">{{ transaction.amount | currency:'USD':'symbol':'1.2-2' }}</span>
              <small class="balance">Balance: {{ transaction.balance | currency:'USD':'symbol':'1.2-2' }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .accounts-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      margin-bottom: 2rem;
    }

    .header h1 {
      font-size: 2.5rem;
      color: #1e40af;
      margin-bottom: 0.5rem;
    }

    .header p {
      color: #6b7280;
      font-size: 1.1rem;
    }

    .accounts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .account-card {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .account-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 20px -3px rgba(0, 0, 0, 0.1);
      border-color: #1e40af;
    }

    .account-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
    }

    .account-type {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .account-icon {
      font-size: 2rem;
      width: 50px;
      height: 50px;
      background: #f3f4f6;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .account-type h3 {
      margin: 0;
      color: #1f2937;
      font-size: 1.25rem;
    }

    .account-number {
      margin: 0.25rem 0 0 0;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .account-status {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      background: #fef2f2;
      color: #dc2626;
    }

    .account-status.active {
      background: #f0fdf4;
      color: #059669;
    }

    .account-balance {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .balance-label {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .balance-amount {
      font-size: 2rem;
      font-weight: 700;
      color: #059669;
    }

    .transactions-section {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-header h2 {
      color: #1e40af;
      font-size: 1.5rem;
      margin: 0;
    }

    .transactions-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .transaction-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      transition: all 0.2s;
    }

    .transaction-item:hover {
      border-color: #1e40af;
      background: #f8fafc;
    }

    .transaction-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.25rem;
    }

    .transaction-icon.credit {
      background: #f0fdf4;
      color: #059669;
    }

    .transaction-icon.debit {
      background: #fef2f2;
      color: #dc2626;
    }

    .transaction-details {
      flex: 1;
    }

    .transaction-details h4 {
      margin: 0 0 0.25rem 0;
      color: #1f2937;
      font-size: 1rem;
    }

    .transaction-category {
      margin: 0 0 0.25rem 0;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .transaction-date {
      color: #9ca3af;
      font-size: 0.75rem;
    }

    .transaction-amount {
      text-align: right;
    }

    .transaction-amount .amount {
      font-size: 1.125rem;
      font-weight: 600;
    }

    .transaction-amount.credit .amount {
      color: #059669;
    }

    .transaction-amount.debit .amount {
      color: #dc2626;
    }

    .transaction-amount .balance {
      display: block;
      color: #6b7280;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }

    @media (max-width: 768px) {
      .accounts-container {
        padding: 1rem;
      }

      .header h1 {
        font-size: 2rem;
      }

      .accounts-grid {
        grid-template-columns: 1fr;
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .transaction-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }

      .transaction-amount {
        text-align: left;
        align-self: flex-end;
      }
    }
  `]
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];
  selectedAccount: Account | null = null;
  transactions: Transaction[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  private loadAccounts(): void {
    this.accountService.getAccounts('1').subscribe(accounts => {
      this.accounts = accounts;
      if (accounts.length > 0) {
        this.selectAccount(accounts[0]);
      }
    });
  }

  selectAccount(account: Account): void {
    this.selectedAccount = account;
    this.accountService.getTransactions(account.id).subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  getAccountIcon(accountType: string): string {
    const icons = {
      checking: '🏦',
      savings: '💰',
      business: '🏢'
    };
    return icons[accountType as keyof typeof icons] || '🏦';
  }
}