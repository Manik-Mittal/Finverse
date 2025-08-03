import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  //acno: any
  username: any
  firstName: any
  lastName: any
  psw: any
  email: any

  d1 = "Enter account number"
  d2 = "enter password"

  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  //model for register form 
  registerForm1 = this.fb.group({
   // acno: [' ', [Validators.required, Validators.pattern('[0-9]+')]],
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    // 
   password: ['', Validators.required],

// password: ['', [
//   Validators.pattern('^[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&]).*$')
// ]]
// ,

    // email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]
    email: ['', [Validators.required, Validators.email]]

  })


  register() {
    //var acno = this.registerForm1.value.acno
     console.log("hey guys")
    
    var username = this.registerForm1.value.username
    var firstName = this.registerForm1.value.firstName
    var lastName = this.registerForm1.value.lastName
    var email = this.registerForm1.value.email
    var password = this.registerForm1.value.password
    console.log("hey guys2")

   console.log({ username,password,email,firstName,lastName });

    if (this.registerForm1.valid) {
      console.log("hey guys3")
      const user = {
         username: this.registerForm1.value.username,
         password: this.registerForm1.value.password,
         email: this.registerForm1.value.email,
         firstName: this.registerForm1.value.firstName,
         lastName: this.registerForm1.value.lastName
         };
      this.ds.register(user).subscribe((result: any) => {
       // alert(result.messsage)
        console.log("hey guys33")
        this.router.navigateByUrl("")
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
