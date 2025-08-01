package com.accountservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;

import com.accountservice.dao.AccountDAO;
import com.accountservice.model.Account;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AccountService {

    @Autowired
    private AccountDAO accountDAO;

    public Account createAccount(Account account) {
        return accountDAO.save(account);
    }

    public Account getAccount(String accountNumber) {
        return accountDAO.findById(accountNumber).orElse(null);
    }

    public Account updateAccount(String accountNumber, Account updatedData) {
        return accountDAO.findById(accountNumber).map(existingAccount -> {
            existingAccount.setName(updatedData.getName());
            existingAccount.setAddress(updatedData.getAddress());
            existingAccount.setPhoneNumber(updatedData.getPhoneNumber());
            return accountDAO.save(existingAccount);
        }).orElse(null);
    }

    public boolean deleteAccount(String accountNumber) {
        if (accountDAO.existsById(accountNumber)) {
            accountDAO.deleteById(accountNumber);
            return true;
        }
        return false;
    }
    
    @Transactional
    public Account updateBalance(String ACCOUNT_NUMBER, double BALANCE, String transactionType) {
        return accountDAO.findById(ACCOUNT_NUMBER).map(account -> {
            double currentBalance = account.getBalance();
            switch (transactionType.toLowerCase()) {
                case "deposit":
                    account.setBalance(currentBalance + BALANCE);
                    break;
                case "withdraw":
                    if (currentBalance >= BALANCE) {
                        account.setBalance(currentBalance - BALANCE);
                    } else {
                        throw new RuntimeException("Insufficient balance");
                    }
                    break;
                default:
                    throw new IllegalArgumentException("Invalid transaction type: " + transactionType);
            }
            return accountDAO.save(account);
        }).orElseThrow(() -> new RuntimeException("Account not found"));
    }
    
    

    public void transfer(String fromAccountNumber, String toAccountNumber, double amount) {
        Account fromAccount = accountDAO.findById(fromAccountNumber)
                .orElseThrow(() -> new RuntimeException("From account not found"));
        Account toAccount = accountDAO.findById(toAccountNumber)
                .orElseThrow(() -> new RuntimeException("To account not found"));

        if (fromAccount.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance in source account");
        }

        fromAccount.setBalance(fromAccount.getBalance() - amount);
        toAccount.setBalance(toAccount.getBalance() + amount);

        accountDAO.save(fromAccount);
        accountDAO.save(toAccount);
        
    }
}

