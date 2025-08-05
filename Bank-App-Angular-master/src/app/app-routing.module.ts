import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserdashComponent } from './userdash/userdash.component';
import { TransactComponent } from './transact/transact.component';
import { TransferComponent } from './transfer/transfer.component';
import { DepositComponent } from './deposit/deposit.component';
import { AccountComponent } from './account/account.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"dashboard",component:UserdashComponent},
  {path:"dash",component:UserdashComponent},
  {path:"trans",component:TransactComponent},
  {path:"transfer",component:TransferComponent},
  {path:"register",component:RegisterComponent},
  {path:"deposit",component:DepositComponent},
  {path:"deposit",component:WithdrawComponent},
  {path:"withdraw",component:WithdrawComponent},

  {path:"manage-accounts",component:AccountComponent},
  {path:"transaction",component:TransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
