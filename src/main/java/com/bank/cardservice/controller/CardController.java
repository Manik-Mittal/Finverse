package com.bank.cardservice.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bank.cardservice.model.Card;
import com.bank.cardservice.service.CardService;

import jakarta.validation.Valid;

@RestController
public class CardController {

    @Autowired
    private CardService service;

    @GetMapping("/card/test")
    public String testCardEndpoint() {
        return "Card Service is running!";
    }

    @PostMapping("/api/cards")
    public ResponseEntity<?> issueCard(@Valid @RequestBody Card card) {
        try {
            Card issuedCard = service.createCard(card);
            return ResponseEntity.ok(issuedCard);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/api/cards/{accountNumber}")
    public ResponseEntity<?> getCards(@PathVariable String accountNumber) {
        List<Card> cards = service.getCardsByAccount(accountNumber);
        if (cards.isEmpty()) {
            return ResponseEntity.ok("No card available for account: " + accountNumber);
        } else {
            return ResponseEntity.ok(cards);
        }
    }

    @GetMapping("/api/cards/details/{cardNumber}")
    public ResponseEntity<Card> getCard(@PathVariable String cardNumber) {
        return ResponseEntity.ok(service.getCardByNumber(cardNumber));
    }

    @PutMapping("/api/cards/block/{cardNumber}")
    public ResponseEntity<Card> block(@PathVariable String cardNumber) {
        return ResponseEntity.ok(service.blockCard(cardNumber));
    }

    @PutMapping("/api/cards/activate/{cardNumber}")
    public ResponseEntity<Card> activate(@PathVariable String cardNumber) {
        return ResponseEntity.ok(service.activateCard(cardNumber));
    }

    @GetMapping("/api/cards/expiring")
    public ResponseEntity<List<Card>> getExpiringCards() {
        return ResponseEntity.ok(service.getCardsExpiringSoon());
    }

    @PutMapping("/api/cards/limit/{cardNumber}")
    public ResponseEntity<Card> setCardLimit(@PathVariable String cardNumber, @RequestBody BigDecimal limit) {
        return ResponseEntity.ok(service.updateCardLimit(cardNumber, limit));
    }

    @GetMapping("/api/cards/limit/{cardNumber}")
    public ResponseEntity<BigDecimal> getCardLimit(@PathVariable String cardNumber) {
        return ResponseEntity.ok(service.getCardLimit(cardNumber));
    }
}
