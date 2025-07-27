package com.finverse.transaction.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "transactions")
public class Transaction {


@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Long id;

@Column(name = "sender_account", nullable = false)
private String senderAccount;

@Column(name = "receiver_account", nullable = false)
private String receiverAccount;

@Column(name = "amount", nullable = false)
private Double amount;

@Column(name = "transaction_time", nullable = false)
private LocalDateTime transactionTime;

@Column(name = "transaction_date", nullable = false)
private LocalDate transactionDate;

@Column(name = "status")
private String status;

@Column(name = "transaction_type", nullable = false)
private String transactionType;

public Transaction() {}

public Transaction(String senderAccount, String receiverAccount, Double amount, String status, String transactionType) {
    this.senderAccount = senderAccount;
    this.receiverAccount = receiverAccount;
    this.amount = amount;
    this.status = status;
    this.transactionType = transactionType;
}

@PrePersist
protected void onCreate() {
    this.transactionTime = LocalDateTime.now();
    this.transactionDate = LocalDate.now();
}

// Getters and Setters

public Long getId() {
    return id;
}

public String getSenderAccount() {
    return senderAccount;
}

public void setSenderAccount(String senderAccount) {
    this.senderAccount = senderAccount;
}

public String getReceiverAccount() {
    return receiverAccount;
}

public void setReceiverAccount(String receiverAccount) {
    this.receiverAccount = receiverAccount;
}

public Double getAmount() {
    return amount;
}

public void setAmount(Double amount) {
    this.amount = amount;
}

public LocalDateTime getTransactionTime() {
    return transactionTime;
}

public LocalDate getTransactionDate() {
    return transactionDate;
}

public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}

public String getTransactionType() {
    return transactionType;
}

public void setTransactionType(String transactionType) {
    this.transactionType = transactionType;
}
}