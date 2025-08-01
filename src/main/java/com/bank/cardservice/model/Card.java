package com.bank.cardservice.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CARD")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Card {

    @Id
    @SequenceGenerator(name = "card_seq", sequenceName = "CARD_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "card_seq")
    @Column(name = "CARD_ID")
    private Long cardId;

    @Column(name = "CARD_NUMBER", nullable = false)
    private String cardNumber;

    @Column(name = "ACCOUNT_NUMBER", nullable = false, unique = true)
    @NotBlank(message = "Account number must not be blank")
    @Pattern(regexp = "\\d{12}", message = "Account number must be exactly 12 digits")
    private String accountNumber;


    @Enumerated(EnumType.STRING)
    @Column(name = "CARD_TYPE", nullable = false)
    @NotNull(message = "Card type is required")
    private CardType cardType;

    @Column(name = "EXPIRY_DATE", nullable = false)
    @NotNull(message = "Expiry date is required")
    @Future(message = "Expiry date must be in the future")
    private LocalDate expiryDate;

    @Column(name = "ISSUED_DATE")
    private LocalDate issuedDate;

    @Column(name = "ACTIVE")
    private Boolean active;

    @Column(name = "CARD_LIMIT")
    @DecimalMin(value = "0.0", inclusive = true, message = "Card limit must be non-negative")
    private BigDecimal cardLimit;
}
