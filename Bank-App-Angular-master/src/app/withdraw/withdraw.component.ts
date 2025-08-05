import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  withdrawForm: FormGroup;
  accounts: any[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.withdrawForm = this.fb.group({
      account: ['', Validators.required], // changed from senderAccount to account
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const userId = 5200;

    this.http.get<any[]>(`http://localhost:8080/api/accounts/user/${userId}`)
      .subscribe({
        next: (data) => {
          this.accounts = data;
        },
        error: (err) => console.error('Failed to fetch accounts:', err)
      });
  }

  onWithdraw(): void {
    if (this.withdrawForm.valid) {
      const withdrawData = this.withdrawForm.value;

      this.http.post('http://localhost:8001/transactions/api/withdraw', withdrawData)
        .subscribe({
          next: () => alert('Withdraw successful!'),
          error: (err) => {
            console.error('Withdraw failed:', err);
            alert('Withdraw failed. Please try again.');
          }
        });
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
