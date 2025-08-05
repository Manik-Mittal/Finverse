import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loan-management',
  templateUrl: './loanpage.component.html',
  styleUrls: ['./loanpage.component.css']
})
export class LoanpageComponent implements OnInit {
  loanForm!: FormGroup;
  loading: boolean = false;
  accounts: any[] = []; // list of user accounts

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`; // use ISO format

    this.loanForm = this.fb.group({
      accountNumber: ['', Validators.required],  // ⬅️ new control
      loanType: ['Personal loan', Validators.required],
      loanAmount: [0, [Validators.required, Validators.min(1)]],
      termInMonths: ['36', Validators.required],
      startDate: [formattedDate, Validators.required],
      interestRate: [7.5, [Validators.required, Validators.min(0)]],
      employmentStatus: ['Employed', Validators.required],
      purpose: ['', Validators.required]
    });

    this.loadAccounts();
  }

  loadAccounts(): void {
    const userId = localStorage.getItem('id');
    if (!userId) {
      alert("User ID not found.");
      return;
    }

    this.http.get<any[]>(`http://localhost:8080/api/accounts/user/${userId}`).subscribe({
      next: (res) => {
        this.accounts = res;
      },
      error: (err) => {
        console.error("❌ Failed to load accounts", err);
        alert("❌ Could not fetch your accounts.");
      }
    });
  }

  submitApplication(): void {
    if (this.loanForm.invalid) {
      alert('❗ Please fill in all required fields correctly.');
      return;
    }

    this.loading = true;

    const user = {
      userId: localStorage.getItem("id"),
      email: localStorage.getItem("email"),
      accountNumber: this.loanForm.value.accountNumber, // 🆕 from form
      loanType: this.loanForm.value.loanType,
      loanAmount: this.loanForm.value.loanAmount,
      termInMonths: this.loanForm.value.termInMonths,
      startDate: this.loanForm.value.startDate,
      interestRate: this.loanForm.value.interestRate,
      employmentStatus: this.loanForm.value.employmentStatus,
      purpose: this.loanForm.value.purpose
    };

    console.log("📤 Submitting loan application:", user);

    this.http.post('http://localhost:8083/api/loans/addLoan', user).subscribe({
      next: (response: any) => {
        console.log('✅ Loan application submitted successfully:', response);
        alert('✅ Application submitted successfully!');
        this.loanForm.reset();
        this.loading = false;
      },
      error: (error: any) => {
        console.error('❌ Error submitting loan application:', error);
        alert('❌ Submission failed. Please try again.');
        this.loading = false;
      }
    });
  }
}
