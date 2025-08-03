import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard1/dashboard.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { LoansComponent } from './components/loans/loans.component';
import { CardsComponent } from './components/cards/cards.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'loans', component: LoansComponent },
  { path: 'cards', component: CardsComponent },
  { path: '**', redirectTo: '/dashboard' }
];