package com.finverse.transaction.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Better for Oracle than AUTO
    private Long id;

    @Column(name = "senderAccount", nullable = false)
    private String senderAccount;

    @Column(name = "receiverAccount", nullable = false)
    private String receiverAccount;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    @Column(name = "transaction_time")
    private LocalTime transactionTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "transaction_date")
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
        if (this.transactionTime == null)
            this.transactionTime = LocalTime.now();
        if (this.transactionDate == null)
            this.transactionDate = LocalDate.now();
    }

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

    public LocalTime getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(LocalTime transactionTime) {
        this.transactionTime = transactionTime;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
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
