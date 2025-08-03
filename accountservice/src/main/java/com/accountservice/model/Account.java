package com.accountservice.model;
import jakarta.persistence.*;
import java.util.Random;
@Entity
@Table(name = "ACCOUNTS")
@Access(AccessType.FIELD)
public class Account {
    @Column(nullable = false)
    private Long userId;  // Provided manually
    @Id
    @Column(length = 12, unique = true, nullable = false)
    private String accountNumber;  // Will be generated if not present
    @Column(nullable = false)
    private String name;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private double balance;
    @Column(nullable = false)
    private String accountType;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String phoneNumber;
    @PrePersist
    public void generateAccountNumber() {
        if (this.accountNumber == null || this.accountNumber.trim().isEmpty()) {
            this.accountNumber = generate12DigitNumber();
        }
    }
    private String generate12DigitNumber() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        while (sb.length() < 12) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }
    // Getters and Setters
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public String getAccountNumber() {
        return accountNumber;
    }
    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public double getBalance() {
        return balance;
    }
    public void setBalance(double balance) {
        this.balance = balance;
    }
    public String getAccountType() {
        return accountType;
    }
    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
