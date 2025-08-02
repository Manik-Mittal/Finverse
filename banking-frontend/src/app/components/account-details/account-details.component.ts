import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  searchForm: FormGroup;
  account: Account | null = null;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.searchForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  searchAccount(): void {
    if (this.searchForm.valid) {
      this.loading = true;
      this.error = '';
      this.account = null;

      const accountNumber = this.searchForm.get('accountNumber')?.value;
      
      this.accountService.getAccount(accountNumber).subscribe({
        next: (response) => {
          this.account = response;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Account not found or server error';
          this.loading = false;
        }
      });
    }
  }

  clearSearch(): void {
    this.searchForm.reset();
    this.account = null;
    this.error = '';
  }
}