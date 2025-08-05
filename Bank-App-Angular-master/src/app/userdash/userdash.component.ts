import { Component, OnInit } from '@angular/core';
import { UserdashService } from '../Services/userdash.service';

@Component({
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.css']
})
export class UserdashComponent implements OnInit {

  accounts: any[] = [];
  loans: any[] = [];
  totalBalance: number = 0;
  // userId: any = 5200; // Can be fetched from localStorage or auth in future
  userId: any = localStorage.getItem('userId');
  userName: any = localStorage.getItem('username');


  constructor(private userdashService: UserdashService) {}

  ngOnInit(): void {
    this.userdashService.getAccountsByUserId(this.userId).subscribe({
      next: (res) => {
        this.accounts = res;
        this.totalBalance = this.accounts.reduce((sum, acc) => sum + acc.balance, 0);
      },
      error: (err) => console.error('Error loading accounts:', err)
    });

    this.userdashService.getLoans().subscribe({
      next: (res) => {
        this.loans = res;
      },
      error: (err) => console.error('Error loading loans:', err)
    });
  }
}
