import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  searchForm: FormGroup;
  transactions: Transaction[] = [];
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.searchForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  searchTransactions(): void {
    if (this.searchForm.valid) {
      this.loading = true;
      this.error = '';
      this.transactions = [];

      const accountNumber = this.searchForm.get('accountNumber')?.value;
      
      this.transactionService.getTransactionsByAccount(accountNumber).subscribe({
        next: (response) => {
          this.transactions = response;
          this.loading = false;
          if (this.transactions.length === 0) {
            this.error = 'No transactions found for this account';
          }
        },
        error: (error) => {
          this.error = 'Failed to fetch transactions. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  clearSearch(): void {
    this.searchForm.reset();
    this.transactions = [];
    this.error = '';
  }

  getTransactionTypeClass(type: string): string {
    return type.toLowerCase();
  }

  getTransactionIcon(type: string): string {
    switch (type.toUpperCase()) {
      case 'DEPOSIT':
        return '💰';
      case 'WITHDRAW':
        return '💸';
      case 'TRANSFER':
        return '🔄';
      default:
        return '📄';
    }
  }
}