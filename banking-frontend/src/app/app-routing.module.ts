import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'account-form', component: AccountFormComponent },
  { path: 'account-details', component: AccountDetailsComponent },
  { path: 'transactions', component: TransactionFormComponent },
  { path: 'transaction-history', component: TransactionHistoryComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }