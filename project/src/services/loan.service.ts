import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Loan, LoanApplication } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private mockLoans: Loan[] = [
    {
      id: '1',
      userId: '1',
      loanType: 'auto',
      amount: 25000,
      interestRate: 4.5,
      termMonths: 60,
      monthlyPayment: 466.08,
      remainingBalance: 18750.50,
      status: 'active',
      applicationDate: '2024-06-15T00:00:00Z',
      approvalDate: '2024-06-20T00:00:00Z',
      nextPaymentDate: '2025-02-15T00:00:00Z'
    },
    {
      id: '2',
      userId: '1',
      loanType: 'personal',
      amount: 10000,
      interestRate: 8.9,
      termMonths: 36,
      monthlyPayment: 318.71,
      remainingBalance: 10000,
      status: 'pending',
      applicationDate: '2025-01-10T00:00:00Z'
    }
  ];

  getUserLoans(userId: string): Observable<Loan[]> {
    return of(this.mockLoans.filter(loan => loan.userId === userId)).pipe(delay(500));
  }

  getLoanById(loanId: string): Observable<Loan | undefined> {
    return of(this.mockLoans.find(loan => loan.id === loanId)).pipe(delay(300));
  }

  applyForLoan(application: LoanApplication): Observable<Loan> {
    const newLoan: Loan = {
      id: Date.now().toString(),
      userId: '1', // Current user
      ...application,
      interestRate: this.calculateInterestRate(application.loanType, application.amount),
      monthlyPayment: this.calculateMonthlyPayment(application.amount, 7.5, application.termMonths),
      remainingBalance: application.amount,
      status: 'pending',
      applicationDate: new Date().toISOString()
    };
    
    this.mockLoans.push(newLoan);
    return of(newLoan).pipe(delay(1000));
  }

  makePayment(loanId: string, amount: number): Observable<boolean> {
    const loan = this.mockLoans.find(l => l.id === loanId);
    if (loan) {
      loan.remainingBalance = Math.max(0, loan.remainingBalance - amount);
      if (loan.remainingBalance === 0) {
        loan.status = 'paid';
      }
    }
    return of(true).pipe(delay(500));
  }

  private calculateInterestRate(loanType: string, amount: number): number {
    const baseRates = {
      personal: 8.9,
      home: 3.5,
      auto: 4.5,
      business: 6.2
    };
    return baseRates[loanType as keyof typeof baseRates] || 7.0;
  }

  private calculateMonthlyPayment(principal: number, rate: number, months: number): number {
    const monthlyRate = rate / 100 / 12;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
           (Math.pow(1 + monthlyRate, months) - 1);
  }
}