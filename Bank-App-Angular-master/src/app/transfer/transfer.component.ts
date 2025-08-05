import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  transferForm: FormGroup;
  myAccounts: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.transferForm = this.fb.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', [Validators.required]],
      reEnterAccount: ['', [Validators.required]],
      receiverName: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const userId: any = localStorage.getItem('userId'); 



    this.http.get<any[]>(`http://localhost:8080/api/accounts/user/${userId}`)
      .subscribe({
        next: (res) => {
          this.myAccounts = res;
        },
        error: (err) => {
          console.error("❌ Failed to load accounts", err);
          alert("❌ Could not fetch your accounts.");
        }
      });
  }

  onSubmit(): void {
    if (this.transferForm.invalid) {
      alert("❌ Fill all fields correctly.");
      return;
    }

    const { fromAccount, toAccount, reEnterAccount, amount } = this.transferForm.value;

    if (toAccount !== reEnterAccount) {
      alert("❌ Receiver account numbers don't match.");
      return;
    }

    const payload = {
      sender: "734335059308",
      receiver: toAccount,
      amount: amount
    };

    this.http.post('http://localhost:8001/transactions/api/transfer', payload).subscribe({
      next: (res) => {
        alert("✅ Transfer successful!");
        this.transferForm.reset();
      },
      error: (err) => {
        alert("❌ Transfer failed!");
        console.error(err);
      }
    });
  }
}
