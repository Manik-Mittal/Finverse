import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  data1 = "Enter your username"
  data2 = "Enter your password"
  // acno:any
  // passwd:any

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  loginForm = this.fb.group({
    // acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    // psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
     password: [' ', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]

  })

  login() {
    console.log("hey guys")
    var username = this.loginForm.value.username
    var password = this.loginForm.value.password

    if (this.loginForm.valid) {
      this.ds.login(username,password).subscribe((result:any)=>{

        localStorage.setItem("username",result.user.username)
        localStorage.setItem("id",JSON.stringify(result.user.id))
        localStorage.setItem("token",JSON.stringify(result.token))
    
        console.log("User:", localStorage.getItem("username"));
         console.log("userid:", localStorage.getItem("id"));
       // alert(result.messsage)
        this.router.navigateByUrl("dashboard")
      },
      result=>{
        //alert(result.error.messsage)
      }
      )
    }
    else {
      alert('invalid form')
    }

  }


}

// ---------------------------------------


