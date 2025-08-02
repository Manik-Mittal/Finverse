import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, BalanceUpdateRequest, TransferRequest } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:8080/api/accounts';

  constructor(private http: HttpClient) {}

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, account);
  }

  getAccount(accountNumber: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/${accountNumber}`);
  }

  updateAccount(accountNumber: string, account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.baseUrl}/${accountNumber}`, account);
  }

  deleteAccount(accountNumber: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${accountNumber}`);
  }

  updateBalance(request: BalanceUpdateRequest): Observable<Account> {
    return this.http.put<Account>(`${this.baseUrl}/update-balance`, request);
  }

  transfer(request: TransferRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/transfer`, request);
  }
}