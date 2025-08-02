import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  features = [
    {
      title: 'Create Account',
      description: 'Open a new savings or current account with us',
      icon: '👤',
      route: '/account-form',
      color: 'blue'
    },
    {
      title: 'Account Details',
      description: 'View your account information and balance',
      icon: '📊',
      route: '/account-details',
      color: 'green'
    },
    {
      title: 'Transactions',
      description: 'Deposit, withdraw, or transfer money',
      icon: '💰',
      route: '/transactions',
      color: 'purple'
    },
    {
      title: 'Transaction History',
      description: 'View your complete transaction history',
      icon: '📋',
      route: '/transaction-history',
      color: 'orange'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}