import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AccountService } from '../../services/account.service';
import { LoanService } from '../../services/loan.service';
import { CardService } from '../../services/card.service';
import { User } from '../../models/user.model';
import { Account } from '../../models/account.model';
import { Loan } from '../../models/loan.model';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <div class="welcome-section">
        <h1>Welcome back, {{ user?.firstName }}!</h1>
        <p class="welcome-subtitle">Here's your financial overview</p>
      </div>

      <div class="quick-stats">
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-content">
            <h3>Total Balance</h3>
            <p class="stat-value">{{ getTotalBalance() | currency }}</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🏦</div>
          <div class="stat-content">
            <h3>Active Accounts</h3>
            <p class="stat-value">{{ accounts.length }}</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">💳</div>
          <div class="stat-content">
            <h3>Active Cards</h3>
            <p class="stat-value">{{ cards.length }}</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📋</div>
          <div class="stat-content">
            <h3>Active Loans</h3>
            <p class="stat-value">{{ activeLoans.length }}</p>
          </div>
        </div>
      </div>

      <div class="dashboard-sections">
        <div class="section">
          <h2>Recent Accounts</h2>
          <div class="account-list">
            <div *ngFor="let account of accounts.slice(0, 2)" class="account-card">
              <div class="account-info">
                <h4>{{ account.accountType | titlecase }} Account</h4>
                <p class="account-number">{{ account.accountNumber }}</p>
              </div>
              <div class="account-balance">
                <span class="balance-amount">{{ account.balance | currency }}</span>
              </div>
            </div>
          </div>
          <a routerLink="/accounts" class="view-all-link">View All Accounts →</a>
        </div>

        <div class="section">
          <h2>Active Loans</h2>
          <div class="loan-list">
            <div *ngFor="let loan of activeLoans.slice(0, 2)" class="loan-card">
              <div class="loan-info">
                <h4>{{ loan.loanType | titlecase }} Loan</h4>
                <p class="loan-amount">{{ loan.amount | currency }} &#64; {{ loan.interestRate }}%</p>
              </div>
              <div class="loan-balance">
                <span class="remaining-balance">{{ loan.remainingBalance | currency }}</span>
                <small>remaining</small>
              </div>
            </div>
          </div>
          <a routerLink="/loans" class="view-all-link">View All Loans →</a>
        </div>
      </div>

      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="action-buttons">
          <a routerLink="/accounts" class="action-btn primary">
            <span class="action-icon">🏦</span>
            <span>Manage Accounts</span>
          </a>
          <a routerLink="/cards" class="action-btn secondary">
            <span class="action-icon">💳</span>
            <span>View Cards</span>
          </a>
          <a routerLink="/loans" class="action-btn accent">
            <span class="action-icon">📋</span>
            <span>Apply for Loan</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .welcome-section {
      margin-bottom: 2rem;
    }

    .welcome-section h1 {
      font-size: 2.5rem;
      color: #1e40af;
      margin-bottom: 0.5rem;
    }

    .welcome-subtitle {
      color: #6b7280;
      font-size: 1.1rem;
    }

    .quick-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .stat-icon {
      font-size: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      background: #f3f4f6;
      border-radius: 12px;
    }

    .stat-content h3 {
      margin: 0 0 0.5rem 0;
      color: #374151;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .stat-value {
      margin: 0;
      font-size: 1.875rem;
      font-weight: 700;
      color: #1e40af;
    }

    .dashboard-sections {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .section {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .section h2 {
      margin: 0 0 1.5rem 0;
      color: #1e40af;
      font-size: 1.5rem;
    }

    .account-card, .loan-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      margin-bottom: 1rem;
      transition: border-color 0.2s;
    }

    .account-card:hover, .loan-card:hover {
      border-color: #1e40af;
    }

    .account-info h4, .loan-info h4 {
      margin: 0 0 0.25rem 0;
      color: #1f2937;
      font-size: 1.1rem;
    }

    .account-number, .loan-amount {
      margin: 0;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .balance-amount, .remaining-balance {
      font-size: 1.25rem;
      font-weight: 600;
      color: #059669;
    }

    .loan-balance {
      text-align: right;
    }

    .loan-balance small {
      display: block;
      color: #6b7280;
      font-size: 0.75rem;
    }

    .view-all-link {
      color: #1e40af;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.875rem;
      transition: color 0.2s;
    }

    .view-all-link:hover {
      color: #1d4ed8;
    }

    .quick-actions {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .quick-actions h2 {
      margin: 0 0 1.5rem 0;
      color: #1e40af;
      font-size: 1.5rem;
    }

    .action-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
    }

    .action-btn.primary {
      background: #1e40af;
      color: white;
    }

    .action-btn.primary:hover {
      background: #1d4ed8;
      transform: translateY(-1px);
    }

    .action-btn.secondary {
      background: #059669;
      color: white;
    }

    .action-btn.secondary:hover {
      background: #047857;
      transform: translateY(-1px);
    }

    .action-btn.accent {
      background: #dc2626;
      color: white;
    }

    .action-btn.accent:hover {
      background: #b91c1c;
      transform: translateY(-1px);
    }

    .action-icon {
      font-size: 1.25rem;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .welcome-section h1 {
        font-size: 2rem;
      }

      .dashboard-sections {
        grid-template-columns: 1fr;
      }

      .quick-stats {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  accounts: Account[] = [];
  loans: Loan[] = [];
  cards: Card[] = [];

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private loanService: LoanService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.loadUserData(user.id);
      }
    });
  }

  private loadUserData(userId: string): void {
    this.accountService.getAccounts(userId).subscribe(accounts => {
      this.accounts = accounts;
    });

    this.loanService.getUserLoans(userId).subscribe(loans => {
      this.loans = loans;
    });

    this.cardService.getUserCards(userId).subscribe(cards => {
      this.cards = cards;
    });
  }

  getTotalBalance(): number {
    return this.accounts.reduce((total, account) => total + account.balance, 0);
  }

  get activeLoans(): Loan[] {
    return this.loans.filter(loan => loan.status === 'active' || loan.status === 'approved');
  }
}