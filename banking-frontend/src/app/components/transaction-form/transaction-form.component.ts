import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  transactionForm: FormGroup;
  selectedTab: 'deposit' | 'withdraw' | 'transfer' = 'deposit';
  isSubmitting = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {
    this.transactionForm = this.fb.group({
      account: ['', [Validators.required, Validators.minLength(10)]],
      toAccount: [''],
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.updateValidators();
  }

  selectTab(tab: 'deposit' | 'withdraw' | 'transfer'): void {
    this.selectedTab = tab;
    this.clearMessage();
    this.transactionForm.reset();
    this.updateValidators();
  }

  updateValidators(): void {
    const toAccountControl = this.transactionForm.get('toAccount');
    
    if (this.selectedTab === 'transfer') {
      toAccountControl?.setValidators([Validators.required, Validators.minLength(10)]);
    } else {
      toAccountControl?.clearValidators();
    }
    
    toAccountControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      this.isSubmitting = true;
      const formValue = this.transactionForm.value;

      switch (this.selectedTab) {
        case 'deposit':
          this.handleDeposit(formValue.account, formValue.amount);
          break;
        case 'withdraw':
          this.handleWithdraw(formValue.account, formValue.amount);
          break;
        case 'transfer':
          this.handleTransfer(formValue.account, formValue.toAccount, formValue.amount);
          break;
      }
    }
  }

  private handleDeposit(account: string, amount: number): void {
    this.transactionService.deposit({ senderAccount: account, amount }).subscribe({
      next: (response) => {
        this.message = `Successfully deposited ₹${amount} to account ${account}`;
        this.messageType = 'success';
        this.transactionForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        this.message = 'Deposit failed. Please check account details and try again.';
        this.messageType = 'error';
        this.isSubmitting = false;
      }
    });
  }

  private handleWithdraw(account: string, amount: number): void {
    this.transactionService.withdraw(account, amount).subscribe({
      next: (response) => {
        this.message = `Successfully withdrew ₹${amount} from account ${account}`;
        this.messageType = 'success';
        this.transactionForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        this.message = 'Withdrawal failed. Please check account balance and try again.';
        this.messageType = 'error';
        this.isSubmitting = false;
      }
    });
  }

  private handleTransfer(fromAccount: string, toAccount: string, amount: number): void {
    this.transactionService.transfer(fromAccount, toAccount, amount).subscribe({
      next: (response) => {
        this.message = `Successfully transferred ₹${amount} from ${fromAccount} to ${toAccount}`;
        this.messageType = 'success';
        this.transactionForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        this.message = 'Transfer failed. Please check account details and balance.';
        this.messageType = 'error';
        this.isSubmitting = false;
      }
    });
  }

  clearMessage(): void {
    this.message = '';
  }

  getSubmitButtonText(): string {
    switch (this.selectedTab) {
      case 'deposit':
        return 'Deposit Money';
      case 'withdraw':
        return 'Withdraw Money';
      case 'transfer':
        return 'Transfer Money';
      default:
        return 'Submit';
    }
  }
}