import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoanpageComponent } from './loanpage.component';
describe('LoanManagementComponent', () => {
  let component: LoanpageComponent;
  let fixture: ComponentFixture<LoanpageComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanpageComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(LoanpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  it('should invalidate form if empty', () => {
    component.loanForm.reset();
    expect(component.loanForm.valid).toBeFalse();
  });
  it('should validate form with valid data', () => {
    component.loanForm.setValue({
      loanType: 'Auto Loan',
      loanAmount: 15000,
      loanTerm: '36',
      purpose: 'Buy a car',
      income: 500000,
      employmentStatus: 'Employed'
    });
    expect(component.loanForm.valid).toBeTrue();
  });
});












