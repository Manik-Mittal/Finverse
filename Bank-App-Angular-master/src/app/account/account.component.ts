import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userId: number = 5200; // replace later with dynamic ID
  accounts: any[] = [];
  transactions: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(`http://localhost:8080/api/accounts/user/${this.userId}`)
      .subscribe({
        next: (data) => {
          this.accounts = data;
          const accountNumbers = this.accounts.map(acc => acc.accountNumber);
          this.getTransactionHistory(accountNumbers);
        },
        error: (err) => {
          console.error('Error fetching accounts:', err);
        }
      });
  }

getTransactionHistory(accountNumbers: number[]) {
  this.transactions = []; // reset

  accountNumbers.forEach(accountNumber => {
    this.http.get<any[]>(`http://localhost:8001/transactions/api/${accountNumber}`)
      .subscribe({
        next: (data) => {
          this.transactions.push(...data); // merge all transactions
        },
        error: (err) => {
          console.error(`Error fetching transactions for account ${accountNumber}:`, err);
        }
      });
  });
}

}
