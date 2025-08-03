import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error on invalid login', () => {
    component.username.set('baduser');
    component.password.set('wrong');
    component.handleLogin(new Event('submit'));
    expect(component.error()).toContain('Invalid');
  });

  it('should login with correct credentials', () => {
    spyOn(window, 'alert');
    component.username.set('user');
    component.password.set('pass');
    component.handleLogin(new Event('submit'));
    expect(component.error()).toBe('');
    expect(window.alert).toHaveBeenCalledWith('Login successful!');
  });
});
