import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navigation">
      <div class="nav-container">
        <div class="nav-brand">
          <span class="brand-icon">🏦</span>
          <span class="brand-text">SecureBank</span>
        </div>

        <div class="nav-links">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">🏠</span>
            <span>Dashboard</span>
          </a>
          <a routerLink="/accounts" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">🏦</span>
            <span>Accounts</span>
          </a>
          <a routerLink="/cards" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">💳</span>
            <span>Cards</span>
          </a>
          <a routerLink="/loans" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">📋</span>
            <span>Loans</span>
          </a>
        </div>

        <div class="nav-user">
          <div class="user-info">
            <span class="user-avatar">👤</span>
            <span class="user-name">{{ (userService.currentUser$ | async)?.firstName || 'User' }}</span>
          </div>
          <button class="logout-btn" (click)="logout()">Logout</button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navigation {
      background: white;
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e40af;
    }

    .brand-icon {
      font-size: 2rem;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      text-decoration: none;
      color: #6b7280;
      border-radius: 8px;
      transition: all 0.2s;
      font-weight: 500;
    }

    .nav-link:hover {
      color: #1e40af;
      background: #f3f4f6;
    }

    .nav-link.active {
      color: #1e40af;
      background: #dbeafe;
    }

    .nav-icon {
      font-size: 1.25rem;
    }

    .nav-user {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #1f2937;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      background: #f3f4f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .user-name {
      font-weight: 500;
    }

    .logout-btn {
      padding: 0.5rem 1rem;
      background: #dc2626;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .logout-btn:hover {
      background: #b91c1c;
    }

    @media (max-width: 768px) {
      .nav-container {
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
      }

      .nav-links {
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
      }

      .nav-link {
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
      }

      .nav-user {
        order: -1;
        width: 100%;
        justify-content: space-between;
      }
    }
  `]
})
export class NavigationComponent {
  constructor(public userService: UserService) {}

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.userService.logout();
      // In a real app, you would redirect to login page
      alert('Logged out successfully!');
    }
  }
}