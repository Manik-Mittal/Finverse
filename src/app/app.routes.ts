import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Transactions } from './pages/transactions/transactions';

export const routes: Routes = [ { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, children: [
    { path: 'transactions', component: Transactions },
    // { path: 'loans', component: Loans },
    // { path: 'accounts', component: Accounts },
    // { path: 'users', component: Users }
  ]}];

