import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private mockUser: User = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phoneNumber: '+1-555-0123',
    dateOfBirth: '1990-01-15',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    createdAt: '2023-01-01T00:00:00Z',
    isActive: true
  };

  constructor() {
    // Simulate logged in user
    this.currentUserSubject.next(this.mockUser);
  }

  login(credentials: LoginRequest): Observable<User> {
    // Simulate API call
    return of(this.mockUser).pipe(delay(1000));
  }

  register(userData: RegisterRequest): Observable<User> {
    const newUser: User = {
      ...this.mockUser,
      ...userData,
      id: Date.now().toString(),
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
      },
      createdAt: new Date().toISOString(),
      isActive: true
    };
    return of(newUser).pipe(delay(1000));
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    const updatedUser = { ...this.mockUser, ...userData };
    this.currentUserSubject.next(updatedUser);
    return of(updatedUser).pipe(delay(500));
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}