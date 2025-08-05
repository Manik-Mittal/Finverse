
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountcrtComponent } from './accountcrt.component';
import { DataService } from '../Services/data.service';
describe('AccountCrtComponent', () => {
  let component: AccountcrtComponent;
  let fixture: ComponentFixture<AccountcrtComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountcrtComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule ],
      providers: [ DataService ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AccountcrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the account form component', () => {
    expect(component).toBeTruthy();
  });
  it('form should be invalid when empty', () => {
    expect(component.registerForm11.valid).toBeFalsy();
  });
  it('form should be valid when all fields are filled', () => {
    component.registerForm11.setValue({
      balance: '1000',
      address: 'Test Address',
      phoneNumber: '1234567890',
      accountType: 'Savings'
    });
    expect(component.registerForm11.valid).toBeTruthy();
  });
});