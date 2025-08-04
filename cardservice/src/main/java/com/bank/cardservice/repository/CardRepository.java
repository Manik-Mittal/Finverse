package com.bank.cardservice.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bank.cardservice.model.Card;

public interface CardRepository extends JpaRepository<Card, Long> {

    Card findByCardNumber(String cardNumber);

    List<Card> findByAccountNumber(String accountNumber);

    @Query("SELECT c FROM Card c WHERE c.expiryDate <= :cutoffDate")
    List<Card> findCardsExpiringSoon(LocalDate cutoffDate);
}
