import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
  styleUrls: ['./card-management.component.css']
})
export class CardManagementComponent implements OnInit {
  cardForm!: FormGroup;

  cards = [
    {
      cardType: 'Credit',
      name: 'Premium Rewards Card',
      number: '**** **** **** 1234',
      expiry: '12/27',
      creditLimit: 5000,
      availableCredit: 3250.75,
      usedPercentage: 35
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      cardType: ['Credit Card', Validators.required],
      cardName: ['', Validators.required],
      annualIncome: [0, [Validators.required, Validators.min(0)]],
      requestedLimit: ['5000', Validators.required]
    });
  }

  applyForCard(): void {
    if (this.cardForm.invalid) {
      alert('Please fill all required fields.');
      return;
    }

    const newCard = this.cardForm.value;
    console.log('Applying for card:', newCard);
    alert('✅ Application submitted successfully!');
    this.cardForm.reset();
  }
}
