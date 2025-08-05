import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  depositForm: FormGroup;
  accounts: any[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.depositForm = this.fb.group({
      senderAccount: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const userId: any = localStorage.getItem('userId'); 

    this.http.get<any[]>(`http://localhost:8080/api/accounts/user/${userId}`)
      .subscribe({
        next: (data) => {
          this.accounts = data;
        },
        error: (err) => console.error('Failed to fetch accounts:', err)
      });
  }

  onDeposit(): void {
    if (this.depositForm.valid) {
      const depositData = this.depositForm.value;

      this.http.post('http://localhost:8001/transactions/api/deposit', depositData)
        .subscribe({
          next: (res) => alert('Deposit successful!'),
          error: (err) => {
            console.error('Deposit failed:', err);
            alert('Deposit failed. Please try again.');
          }
        });
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
