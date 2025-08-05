import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdashService {

  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/accounts/734335059308`);
  }

  getLoans(): Observable<any> {
    return this.http.get(`${this.baseUrl}/loans`);
  }

  getAccountsByUserId(userId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/api/accounts/user/${userId}`);
}

  // Add more methods if you have cards, transactions, etc.
}