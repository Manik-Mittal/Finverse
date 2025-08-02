import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
  accountForm: FormGroup;
  isSubmitting = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.accountForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      balance: [0, [Validators.required, Validators.min(0)]],
      accountType: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.accountForm.valid) {
      this.isSubmitting = true;
      const account: Account = this.accountForm.value;
      
      this.accountService.createAccount(account).subscribe({
        next: (response) => {
          this.message = 'Account created successfully!';
          this.messageType = 'success';
          this.accountForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          this.message = 'Error creating account. Please try again.';
          this.messageType = 'error';
          this.isSubmitting = false;
        }
      });
    }
  }

  clearMessage(): void {
    this.message = '';
  }
}