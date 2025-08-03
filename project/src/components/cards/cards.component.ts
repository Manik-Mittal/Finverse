import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { Card, CardApplication } from '../../models/card.model';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cards-container">
      <div class="header">
        <h1>Card Management</h1>
        <p>Manage your credit and debit cards</p>
      </div>

      <div class="content-sections">
        <div class="existing-cards">
          <h2>Your Cards</h2>
          <div class="cards-grid">
            <div *ngFor="let card of cards" class="card-item" [class.blocked]="card.isBlocked">
              <div class="card-visual" [class]="card.cardType">
                <div class="card-header">
                  <span class="card-brand">{{ getBankName() }}</span>
                  <span class="card-type-badge">{{ card.cardType | titlecase }}</span>
                </div>
                <div class="card-number">{{ card.cardNumber }}</div>
                <div class="card-details">
                  <div class="card-name">{{ card.cardName }}</div>
                  <div class="card-expiry">{{ card.expiryDate }}</div>
                </div>
                <div *ngIf="card.isBlocked" class="blocked-overlay">
                  <span>BLOCKED</span>
                </div>
              </div>

              <div class="card-info">
                <div *ngIf="card.cardType === 'credit'" class="credit-info">
                  <div class="info-row">
                    <span class="label">Credit Limit:</span>
                    <span class="value">{{ card.creditLimit | currency }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">Available Credit:</span>
                    <span class="value available">{{ card.availableCredit | currency }}</span>
                  </div>
                  <div class="credit-usage">
                    <div class="usage-bar">
                      <div class="usage-fill" [style.width.%]="getCreditUsagePercentage(card)"></div>
                    </div>
                    <small>{{ getCreditUsagePercentage(card) }}% used</small>
                  </div>
                </div>

                <div class="card-actions">
                  <button *ngIf="!card.isBlocked" class="action-btn danger" (click)="blockCard(card.id)">
                    Block Card
                  </button>
                  <button *ngIf="card.isBlocked" class="action-btn primary" (click)="unblockCard(card.id)">
                    Unblock Card
                  </button>
                  <button class="action-btn secondary">View Statements</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-application">
          <h2>Apply for a New Card</h2>
          <form (ngSubmit)="submitApplication()" #cardForm="ngForm" class="application-form">
            <div class="form-group">
              <label for="cardType">Card Type</label>
              <select id="cardType" [(ngModel)]="application.cardType" name="cardType" required>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
              </select>
            </div>

            <div class="form-group">
              <label for="cardName">Card Name</label>
              <input type="text" id="cardName" [(ngModel)]="application.cardName" name="cardName" 
                     required placeholder="e.g., Premium Rewards Card">
            </div>

            <div *ngIf="application.cardType === 'credit'" class="form-group">
              <label for="annualIncome">Annual Income</label>
              <input type="number" id="annualIncome" [(ngModel)]="application.annualIncome" 
                     name="annualIncome" placeholder="Enter your annual income">
            </div>

            <div *ngIf="application.cardType === 'credit'" class="form-group">
              <label for="requestedLimit">Requested Credit Limit</label>
              <select id="requestedLimit" [(ngModel)]="application.requestedLimit" name="requestedLimit">
                <option value="1000">$1,000</option>
                <option value="2500">$2,500</option>
                <option value="5000">$5,000</option>
                <option value="10000">$10,000</option>
                <option value="15000">$15,000</option>
                <option value="25000">$25,000</option>
              </select>
            </div>

            <button type="submit" class="submit-btn" [disabled]="!cardForm.form.valid || isSubmitting">
              {{ isSubmitting ? 'Submitting...' : 'Apply for Card' }}
            </button>
          </form>

          <div class="card-benefits">
            <h3>Card Benefits</h3>
            <ul>
              <li>24/7 fraud monitoring</li>
              <li>Contactless payments</li>
              <li>Worldwide acceptance</li>
              <li>Mobile banking integration</li>
              <li>Reward points on purchases</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cards-container {
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

    .existing-cards h2, .card-application h2 {
      color: #1e40af;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .cards-grid {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .card-item {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .card-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .card-item.blocked {
      opacity: 0.7;
    }

    .card-visual {
      position: relative;
      background: linear-gradient(135deg, #1e40af, #3b82f6);
      border-radius: 16px;
      padding: 1.5rem;
      color: white;
      margin-bottom: 1.5rem;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card-visual.credit {
      background: linear-gradient(135deg, #dc2626, #ef4444);
    }

    .card-visual.debit {
      background: linear-gradient(135deg, #059669, #10b981);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-brand {
      font-size: 1.25rem;
      font-weight: 700;
    }

    .card-type-badge {
      background: rgba(255, 255, 255, 0.2);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .card-number {
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: 2px;
      margin: 1rem 0;
    }

    .card-details {
      display: flex;
      justify-content: space-between;
      align-items: end;
    }

    .card-name {
      font-size: 1rem;
      font-weight: 500;
    }

    .card-expiry {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .blocked-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .card-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .credit-info {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .info-row .label {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .info-row .value {
      font-weight: 600;
      color: #1f2937;
    }

    .info-row .value.available {
      color: #059669;
    }

    .credit-usage {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .usage-bar {
      width: 100%;
      height: 8px;
      background: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
    }

    .usage-fill {
      height: 100%;
      background: linear-gradient(90deg, #059669, #10b981);
      transition: width 0.3s ease;
    }

    .card-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .action-btn {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.875rem;
    }

    .action-btn.primary {
      background: #1e40af;
      color: white;
    }

    .action-btn.primary:hover {
      background: #1d4ed8;
    }

    .action-btn.secondary {
      background: #f3f4f6;
      color: #374151;
    }

    .action-btn.secondary:hover {
      background: #e5e7eb;
    }

    .action-btn.danger {
      background: #dc2626;
      color: white;
    }

    .action-btn.danger:hover {
      background: #b91c1c;
    }

    .card-application {
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
      margin-bottom: 2rem;
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
    .form-group select {
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #1e40af;
      box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
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

    .card-benefits {
      border-top: 1px solid #e5e7eb;
      padding-top: 1.5rem;
    }

    .card-benefits h3 {
      color: #1f2937;
      font-size: 1.125rem;
      margin-bottom: 1rem;
    }

    .card-benefits ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .card-benefits li {
      padding: 0.5rem 0;
      color: #6b7280;
      font-size: 0.875rem;
      position: relative;
      padding-left: 1.5rem;
    }

    .card-benefits li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #059669;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .cards-container {
        padding: 1rem;
      }

      .header h1 {
        font-size: 2rem;
      }

      .content-sections {
        grid-template-columns: 1fr;
      }

      .card-actions {
        justify-content: center;
      }

      .action-btn {
        flex: 1;
        min-width: 120px;
      }
    }
  `]
})
export class CardsComponent implements OnInit {
  cards: Card[] = [];
  isSubmitting = false;
  application: CardApplication = {
    cardType: 'credit',
    cardName: '',
    annualIncome: 0,
    requestedLimit: 5000
  };

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  private loadCards(): void {
    this.cardService.getUserCards('1').subscribe(cards => {
      this.cards = cards;
    });
  }

  submitApplication(): void {
    this.isSubmitting = true;
    this.cardService.applyForCard(this.application).subscribe({
      next: (card) => {
        this.cards.push(card);
        this.resetForm();
        this.isSubmitting = false;
        alert('Card application submitted successfully!');
      },
      error: () => {
        this.isSubmitting = false;
        alert('Error submitting application. Please try again.');
      }
    });
  }

  blockCard(cardId: string): void {
    if (confirm('Are you sure you want to block this card?')) {
      this.cardService.blockCard(cardId).subscribe(() => {
        this.loadCards();
        alert('Card blocked successfully!');
      });
    }
  }

  unblockCard(cardId: string): void {
    this.cardService.unblockCard(cardId).subscribe(() => {
      this.loadCards();
      alert('Card unblocked successfully!');
    });
  }

  getCreditUsagePercentage(card: Card): number {
    if (!card.creditLimit || !card.availableCredit) return 0;
    return Math.round(((card.creditLimit - card.availableCredit) / card.creditLimit) * 100);
  }

  getBankName(): string {
    return 'SecureBank';
  }

  private resetForm(): void {
    this.application = {
      cardType: 'credit',
      cardName: '',
      annualIncome: 0,
      requestedLimit: 5000
    };
  }
}