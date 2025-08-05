package com.bank.cardservice.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.cardservice.client.AccountClient;
import com.bank.cardservice.dto.AccountDto;
import com.bank.cardservice.exceptions.CardNotFoundException;
import com.bank.cardservice.model.Card;
import com.bank.cardservice.repository.CardRepository;
import com.bank.cardservice.util.CardNumberGenerator;

@Service
public class CardService {

    private static final Logger logger = LoggerFactory.getLogger(CardService.class);

    @Autowired
    private CardRepository repo;

    @Autowired
    private AccountClient accountClient;

    public Card createCard(Card card) {
        // Validate account using Account microservice
        if (!accountClient.doesAccountExist(card.getAccountNumber())) {
            throw new IllegalArgumentException("Account number does not exist: " + card.getAccountNumber());
        }

        card.setIssuedDate(LocalDate.now());
        card.setActive(true);

        // Auto-generate card number if not provided
        if (card.getCardNumber() == null || card.getCardNumber().isBlank()) {
            card.setCardNumber(CardNumberGenerator.generate());
        }

        logger.info("Issuing new card for account: {}", card.getAccountNumber());
        return repo.save(card);
    }
    public List<Card> getActiveCardsByUserId(Long userId) {
        List<AccountDto> accounts = accountClient.getAccountsByUserId(userId);

        if (accounts == null || accounts.isEmpty()) {
            logger.warn("No accounts found for userId: {}", userId);
            return Collections.emptyList();
        }

        List<String> accountNumbers = accounts.stream()
                .map(AccountDto::getAccountNumber)
                .toList();

        List<Card> allCards = repo.findByAccountNumberIn(accountNumbers);

        return allCards.stream()
                .filter(Card::getActive)
                .toList();
    }
    public int countActiveCardsByUserId(Long userId) {
        List<Card> activeCards = getActiveCardsByUserId(userId);
        return activeCards.size();
    }

    public List<Card> getCardsByAccount(String accountNumber) {
        logger.info("Fetching cards for account: {}", accountNumber);
        return repo.findByAccountNumber(accountNumber);
    }

    public Card getCardByNumber(String cardNumber) {
        logger.info("Fetching card with number: {}", cardNumber);
        Card card = repo.findByCardNumber(cardNumber);
        if (card == null) {
            logger.warn("Card not found: {}", cardNumber);
            throw new CardNotFoundException("Card not found with number: " + cardNumber);
        }
        return card;
    }

    public Card blockCard(String cardNumber) {
        logger.info("Blocking card: {}", cardNumber);
        Card card = getCardByNumber(cardNumber);
        card.setActive(false);
        return repo.save(card);
    }

    public Card activateCard(String cardNumber) {
        logger.info("Activating card: {}", cardNumber);
        Card card = getCardByNumber(cardNumber);
        card.setActive(true);
        return repo.save(card);
    }

    public List<Card> getCardsExpiringSoon() {
        LocalDate cutoffDate = LocalDate.now().plusMonths(3);
        logger.info("Fetching cards expiring before {}", cutoffDate);
        return repo.findCardsExpiringSoon(cutoffDate);
    }

    public Card updateCardLimit(String cardNumber, BigDecimal limit) {
        logger.info("Updating card limit for {} to {}", cardNumber, limit);
        Card card = getCardByNumber(cardNumber);
        card.setCardLimit(limit);
        return repo.save(card);
    }

    public BigDecimal getCardLimit(String cardNumber) {
        logger.info("Retrieving card limit for {}", cardNumber);
        return getCardByNumber(cardNumber).getCardLimit();
    }
}
