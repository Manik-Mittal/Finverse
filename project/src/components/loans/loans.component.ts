import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanService } from '../../services/loan.service';
import { Loan, LoanApplication } from '../../models/loan.model';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="loans-container">
      <div class="header">
        <h1>Loan Management</h1>
        <p>Apply for new loans and manage existing ones</p>
      </div>

      <div class="content-sections">
        <div class="existing-loans">
          <h2>Your Loans</h2>
          <div class="loans-grid">
            <div *ngFor="let loan of loans" class="loan-card">
              <div class="loan-header">
                <div class="loan-type">
                  <span class="loan-icon">{{ getLoanIcon(loan.loanType) }}</span>
                  <div>
                    <h3>{{ loan.loanType | titlecase }} Loan</h3>
                    <p class="loan-id">Loan #{{ loan.id }}</p>
                  </div>
                </div>
                <div class="loan-status" [class]="loan.status">
                  {{ loan.status | titlecase }}
                </div>
              </div>
              
              <div class="loan-details">
                <div class="detail-row">
                  <span class="label">Original Amount:</span>
                  <span class="value">{{ loan.amount | currency }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Interest Rate:</span>
                  <span class="value">{{ loan.interestRate }}%</span>
                </div>
                <div class="detail-row">
                  <span class="label">Monthly Payment:</span>
                  <span class="value">{{ loan.monthlyPayment | currency }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Remaining Balance:</span>
                  <span class="value balance">{{ loan.remainingBalance | currency }}</span>
                </div>
                <div *ngIf="loan.nextPaymentDate" class="detail-row">
                  <span class="label">Next Payment:</span>
                  <span class="value">{{ loan.nextPaymentDate | date:'MMM dd, yyyy' }}</span>
                </div>
              </div>

              <div *ngIf="loan.status === 'active'" class="loan-actions">
                <button class="action-btn primary" (click)="makePayment(loan.id)">Make Payment</button>
              </div>
            </div>
          </div>
        </div>

        <div class="loan-application">
          <h2>Apply for a New Loan</h2>
          <form (ngSubmit)="submitApplication()" #loanForm="ngForm" class="application-form">
            <div class="form-group">
              <label for="loanType">Loan Type</label>
              <select id="loanType" [(ngModel)]="application.loanType" name="loanType" required>
                <option value="personal">Personal Loan</option>
                <option value="home">Home Loan</option>
                <option value="auto">Auto Loan</option>
                <option value="business">Business Loan</option>
              </select>
            </div>

            <div class="form-group">
              <label for="amount">Loan Amount</label>
              <input type="number" id="amount" [(ngModel)]="application.amount" name="amount" 
                     min="1000" max="500000" required placeholder="Enter amount">
            </div>

            <div class="form-group">
              <label for="termMonths">Loan Term (Months)</label>
              <select id="termMonths" [(ngModel)]="application.termMonths" name="termMonths" required>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
                <option value="36">36 months</option>
                <option value="48">48 months</option>
                <option value="60">60 months</option>
                <option value="72">72 months</option>
                <option value="84">84 months</option>
              </select>
            </div>

            <div class="form-group">
              <label for="purpose">Purpose of Loan</label>
              <textarea id="purpose" [(ngModel)]="application.purpose" name="purpose" 
                        required placeholder="Describe the purpose of this loan"></textarea>
            </div>

            <div class="form-group">
              <label for="annualIncome">Annual Income</label>
              <input type="number" id="annualIncome" [(ngModel)]="application.annualIncome" 
                     name="annualIncome" required placeholder="Enter your annual income">
            </div>

            <div class="form-group">
              <label for="employmentStatus">Employment Status</label>
              <select id="employmentStatus" [(ngModel)]="application.employmentStatus" 
                      name="employmentStatus" required>
                <option value="employed">Employed</option>
                <option value="self-employed">Self Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="retired">Retired</option>
                <option value="student">Student</option>
              </select>
            </div>

            <button type="submit" class="submit-btn" [disabled]="!loanForm.form.valid || isSubmitting">
              {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loans-container {
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

    .content-sections {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }

    .existing-loans h2, .loan-application h2 {
      color: #1e40af;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .loans-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .loan-card {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .loan-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .loan-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
    }

    .loan-type {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .loan-icon {
      font-size: 2rem;
      width: 50px;
      height: 50px;
      background: #f3f4f6;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loan-type h3 {
      margin: 0;
      color: #1f2937;
      font-size: 1.25rem;
    }

    .loan-id {
      margin: 0.25rem 0 0 0;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .loan-status {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .loan-status.pending {
      background: #fef3c7;
      color: #d97706;
    }

    .loan-status.approved {
      background: #d1fae5;
      color: #059669;
    }

    .loan-status.active {
      background: #dbeafe;
      color: #1e40af;
    }

    .loan-status.paid {
      background: #f3f4f6;
      color: #6b7280;
    }

    .loan-status.rejected {
      background: #fecaca;
      color: #dc2626;
    }

    .loan-details {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .detail-row .label {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .detail-row .value {
      font-weight: 600;
      color: #1f2937;
    }

    .detail-row .value.balance {
      color: #dc2626;
      font-size: 1.125rem;
    }

    .loan-actions {
      display: flex;
      gap: 1rem;
    }

    .action-btn {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .action-btn.primary {
      background: #1e40af;
      color: white;
    }

    .action-btn.primary:hover {
      background: #1d4ed8;
    }

    .loan-application {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      height: fit-content;
    }

    .application-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #1e40af;
      box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 80px;
    }

    .submit-btn {
      padding: 1rem 2rem;
      background: #1e40af;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .submit-btn:hover:not(:disabled) {
      background: #1d4ed8;
    }

    .submit-btn:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .loans-container {
        padding: 1rem;
      }

      .header h1 {
        font-size: 2rem;
      }

      .content-sections {
        grid-template-columns: 1fr;
      }

      .loan-header {
        flex-direction: column;
        gap: 1rem;
      }

      .loan-actions {
        justify-content: center;
      }
    }
  `]
})
export class LoansComponent implements OnInit {
  loans: Loan[] = [];
  isSubmitting = false;
  application: LoanApplication = {
    loanType: 'personal',
    amount: 0,
    termMonths: 36,
    purpose: '',
    annualIncome: 0,
    employmentStatus: 'employed'
  };

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  private loadLoans(): void {
    this.loanService.getUserLoans('1').subscribe(loans => {
      this.loans = loans;
    });
  }

  submitApplication(): void {
    this.isSubmitting = true;
    this.loanService.applyForLoan(this.application).subscribe({
      next: (loan) => {
        this.loans.push(loan);
        this.resetForm();
        this.isSubmitting = false;
        alert('Loan application submitted successfully!');
      },
      error: () => {
        this.isSubmitting = false;
        alert('Error submitting application. Please try again.');
      }
    });
  }

  makePayment(loanId: string): void {
    const amount = prompt('Enter payment amount:');
    if (amount && !isNaN(Number(amount))) {
      this.loanService.makePayment(loanId, Number(amount)).subscribe(() => {
        this.loadLoans();
        alert('Payment processed successfully!');
      });
    }
  }

  private resetForm(): void {
    this.application = {
      loanType: 'personal',
      amount: 0,
      termMonths: 36,
      purpose: '',
      annualIncome: 0,
      employmentStatus: 'employed'
    };
  }

  getLoanIcon(loanType: string): string {
    const icons = {
      personal: '👤',
      home: '🏠',
      auto: '🚗',
      business: '🏢'
    };
    return icons[loanType as keyof typeof icons] || '📄';
  }
}