package com.finverse.transaction.dto;


public class DepositRequest {
    private String senderAccount;
    private Double amount;

    // Getters and Setters
    public String getSenderAccount() {
        return senderAccount;
    }

    public void setSenderAccount(String senderAccount) {
        this.senderAccount = senderAccount;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
