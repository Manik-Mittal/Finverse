
import { Component ,OnInit} from '@angular/core';
import { FormBuilder, Validators ,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
@Component({
  selector: 'app-register',
  templateUrl: './accountcrt.component.html',
  styleUrls: ['./accountcrt.component.css']
})
export class AccountcrtComponent  {
  //acno: any
  name:any
  email:any
   phoneNumber: any
    address: any
  balance: any
  accountType: any
  userId: any
  d1 = "Enter account number"
  d2 = "enter password"
  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }
  //model for register form
  registerForm11 = this.fb.group({
   // acno: [' ', [Validators.required, Validators.pattern('[0-9]+')]],
   balance: ['', [Validators.required]],
   address: ['', Validators.required],
   phoneNumber: ['', [Validators.required, ]],
   accountType: ['', Validators.required]
    // email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]
   // email: ['', [Validators.required, Validators.email]]
  })
  account() {
    //var acno = this.registerForm1.value.acno
     console.log("hey guys")
    var name=localStorage.getItem("username")
    var  email=localStorage.getItem("email")
    var PhoneNumber=this.registerForm11.value.phoneNumber
    var address = this.registerForm11.value.address
    var balance = this.registerForm11.value.balance
    var accountType=this.registerForm11.value.accountType
    var userId=localStorage.getItem("id")
    console.log("hey guys2")
   console.log({ name,email,PhoneNumber,address });
   console.log({balance,accountType,userId });
    if (this.registerForm11.valid) {
      console.log("hey guys3")
      const user = {
         name:localStorage.getItem("username"),
          email:localStorage.getItem("email"),
     
         phoneNumber:this.registerForm11.value.phoneNumber,
        address :this.registerForm11.value.address,
         balance :this.registerForm11.value.balance,
        accountType:this.registerForm11.value.accountType,
        userId:localStorage.getItem("id"),
         };
         console.log(user)
      this.ds.accountcrt(user).subscribe((result: any) => {
       // alert(result.messsage)
        console.log("hey guys33")
        this.router.navigateByUrl("userdash")
      },
        result => {
          alert(result.error.message)
           //alert("i am god")
        }
      )
    }
    else {
      alert("Invalid form")
    }
  }
}






