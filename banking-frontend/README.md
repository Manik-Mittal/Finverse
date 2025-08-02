# SecureBank - Angular Banking Frontend

A modern, responsive Angular frontend application for banking operations that integrates with Spring Boot microservices.

## Features

### 🏦 Account Management
- **Create Account**: Open new savings or current accounts
- **Account Details**: View account information and balance
- **Account Validation**: Form validation with real-time feedback

### 💰 Transaction Services
- **Deposit Money**: Add funds to accounts
- **Withdraw Money**: Remove funds with balance validation
- **Transfer Money**: Send money between accounts
- **Transaction History**: View complete transaction records

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Material Design**: Clean, professional interface
- **Real-time Validation**: Instant form feedback
- **Loading States**: Visual feedback during operations
- **Error Handling**: User-friendly error messages

## Technology Stack

- **Angular 17+**: Modern web framework
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling
- **Reactive Forms**: Form handling and validation
- **HttpClient**: API communication
- **RxJS**: Reactive programming

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/           # Home page with feature overview
│   │   ├── header/              # Navigation header
│   │   ├── account-form/        # Create new accounts
│   │   ├── account-details/     # View account information
│   │   ├── transaction-form/    # Banking transactions
│   │   └── transaction-history/ # Transaction records
│   ├── models/                  # TypeScript interfaces
│   ├── services/                # API services
│   └── app-routing.module.ts    # Route configuration
├── styles.scss                  # Global styles
└── index.html                   # Main HTML file
```

## API Integration

### Account Service (Port 8080)
- `POST /api/accounts` - Create account
- `GET /api/accounts/{accountNumber}` - Get account details
- `PUT /api/accounts/{accountNumber}` - Update account
- `DELETE /api/accounts/{accountNumber}` - Delete account
- `PUT /api/accounts/update-balance` - Update balance
- `POST /api/accounts/transfer` - Transfer money

### Transaction Service (Port 8001)
- `POST /transactions/api/deposit` - Deposit money
- `POST /transactions/api/withdraw` - Withdraw money
- `POST /transactions/api/transfer` - Transfer money
- `GET /transactions/api/{account}` - Get transaction history

## Getting Started

### Prerequisites
- Node.js 18+
- Angular CLI 17+
- Running Spring Boot services (Account & Transaction)

### Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd banking-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   ng serve
   ```

4. **Open your browser**:
   Navigate to `http://localhost:4200`

### Backend Services

Make sure your Spring Boot services are running:
- Account Service: `http://localhost:8080`
- Transaction Service: `http://localhost:8001`

## Features Overview

### Dashboard
- Welcome screen with service overview
- Quick navigation to all features
- Statistics and information cards

### Account Management
- Create new accounts with validation
- Search and view account details
- Real-time balance display

### Transaction Operations
- Tabbed interface for different transaction types
- Form validation and error handling
- Success/error message display

### Transaction History
- Search transactions by account
- Detailed transaction information
- Responsive transaction cards

## Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured layout
- **Tablet**: Optimized for touch interaction
- **Mobile**: Compact, mobile-first design

## Error Handling

- **Form Validation**: Real-time field validation
- **API Errors**: User-friendly error messages
- **Network Issues**: Graceful error handling
- **Loading States**: Visual feedback during operations

## Styling Features

- **Modern Design**: Clean, professional appearance
- **Smooth Animations**: Hover effects and transitions
- **Color Coding**: Visual distinction for different operations
- **Consistent Spacing**: 8px grid system
- **Typography**: Clear hierarchy and readability

## Development

### Code Organization
- **Components**: Modular, reusable components
- **Services**: Centralized API communication
- **Models**: Type-safe data structures
- **Routing**: Clean URL structure

### Best Practices
- **TypeScript**: Full type safety
- **Reactive Forms**: Robust form handling
- **Error Handling**: Comprehensive error management
- **Responsive Design**: Mobile-first approach

## Build and Deployment

### Development Build
```bash
ng serve
```

### Production Build
```bash
ng build --prod
```

### Testing
```bash
ng test
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.