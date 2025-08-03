import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  constructor(private router: Router) {}
  // Simple username/password signals for demo (replace with FormGroup in real app)
  username = signal('');
  password = signal('');
  error = signal('');
  routes: any;


  

  handleLogin(event: Event) {
    event.preventDefault();
    const creds = {
      username: this.username(),
      password: this.password()
    };
    console.log('inside handleLogin');
    console.log("username", this.username());
    console.log("password", this.password());

    // TODO: Replace with real auth logic
    if (this.username() === 'user' && this.password() === 'pass') {
      this.error.set('');
      // Redirect to dashboard after successful login
      this.router.navigate(['/dashboard']);
      // Example: navigate to dashboard, or emit login
      alert('Login successful!');
    } else {
      this.error.set('Invalid username or password.');
    }
  }

  // For quick demo/testing, reset
  resetForm() {
    this.username.set('');
    this.password.set('');
    this.error.set('');
  }
}
