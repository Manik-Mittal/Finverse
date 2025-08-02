import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, DepositRequest } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:8001/transactions/api';

  constructor(private http: HttpClient) {}

  deposit(request: DepositRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/deposit`, request);
  }

  withdraw(account: string, amount: number): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/withdraw?account=${account}&amount=${amount}`, {});
  }

  transfer(sender: string, receiver: string, amount: number): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/transfer?sender=${sender}&receiver=${receiver}&amount=${amount}`, {});
  }

  getTransactionsByAccount(account: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/${account}`);
  }
}