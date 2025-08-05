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
import { LoanpageComponent } from './loanpage/loanpage.component';
import { AccountcrtComponent } from './accountcrt/accountcrt.component';
import { CardManagementComponent } from './card-management/card-management.component';

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
  {path:"loanpage",component:LoanpageComponent},
  {path:"accrt",component:AccountcrtComponent},
  {path:"cards",component:CardManagementComponent},

  {path:"manage-accounts",component:AccountComponent},
  {path:"transaction",component:TransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
