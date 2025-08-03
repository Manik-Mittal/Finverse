import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Card, CardApplication } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private mockCards: Card[] = [
    {
      id: '1',
      userId: '1',
      cardNumber: '**** **** **** 1234',
      cardType: 'credit',
      cardName: 'Premium Rewards Card',
      expiryDate: '12/27',
      cvv: '***',
      creditLimit: 5000,
      availableCredit: 3250.75,
      isActive: true,
      isBlocked: false,
      createdAt: '2023-03-15T00:00:00Z'
    },
    {
      id: '2',
      userId: '1',
      cardNumber: '**** **** **** 5678',
      cardType: 'debit',
      cardName: 'Checking Account Card',
      expiryDate: '08/26',
      cvv: '***',
      isActive: true,
      isBlocked: false,
      createdAt: '2023-01-01T00:00:00Z'
    }
  ];

  getUserCards(userId: string): Observable<Card[]> {
    return of(this.mockCards.filter(card => card.userId === userId)).pipe(delay(500));
  }

  getCardById(cardId: string): Observable<Card | undefined> {
    return of(this.mockCards.find(card => card.id === cardId)).pipe(delay(300));
  }

  applyForCard(application: CardApplication): Observable<Card> {
    const newCard: Card = {
      id: Date.now().toString(),
      userId: '1', // Current user
      cardNumber: '**** **** **** ' + Math.floor(1000 + Math.random() * 9000),
      cardType: application.cardType,
      cardName: application.cardName,
      expiryDate: this.generateExpiryDate(),
      cvv: '***',
      creditLimit: application.requestedLimit,
      availableCredit: application.requestedLimit,
      isActive: true,
      isBlocked: false,
      createdAt: new Date().toISOString()
    };
    
    this.mockCards.push(newCard);
    return of(newCard).pipe(delay(1000));
  }

  blockCard(cardId: string): Observable<boolean> {
    const card = this.mockCards.find(c => c.id === cardId);
    if (card) {
      card.isBlocked = true;
    }
    return of(true).pipe(delay(500));
  }

  unblockCard(cardId: string): Observable<boolean> {
    const card = this.mockCards.find(c => c.id === cardId);
    if (card) {
      card.isBlocked = false;
    }
    return of(true).pipe(delay(500));
  }

  private generateExpiryDate(): string {
    const now = new Date();
    const futureDate = new Date(now.getFullYear() + 4, now.getMonth());
    const month = (futureDate.getMonth() + 1).toString().padStart(2, '0');
    const year = futureDate.getFullYear().toString().slice(-2);
    return `${month}/${year}`;
  }
}