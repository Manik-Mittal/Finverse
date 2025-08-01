package com.finverse.transaction.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finverse.transaction.dto.BalanceUpdateRequest;
import com.finverse.transaction.dto.TransferRequest;
import com.finverse.transaction.exception.TransactionException;
import com.finverse.transaction.model.Transaction;
import com.finverse.transaction.proxyService.AccountClient;
import com.finverse.transaction.repo.TransactionRepo;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepo transactionRepo;

    @Autowired
    private AccountClient accountClient;

    @Override
    public Transaction deposit(String senderAccount, Double amount) {
        if (senderAccount == null || senderAccount.isEmpty()) {
            throw new TransactionException("Sender account must not be null or empty for deposit.");
        }
        if (amount == null || amount <= 0) {
            throw new TransactionException("Deposit amount must be greater than zero.");
        }

        // 1. Call Account Service to update balance
        BalanceUpdateRequest request = new BalanceUpdateRequest();
        request.setAccountNumber(senderAccount);
        request.setAmount(amount);
        request.setTransactionType("deposit"); // or "DEPOSIT" based on your Account MS logic

        accountClient.updateBalance(request); // Call the Feign client

        // 2. Save transaction record
        Transaction txn = new Transaction();
        txn.setSenderAccount(senderAccount);
        txn.setReceiverAccount(senderAccount);
        txn.setAmount(amount);
        txn.setTransactionType("DEPOSIT");

        return transactionRepo.save(txn);
    }


    @Override
    public Transaction withdraw(String account, Double amount) {
        if (account == null || account.isEmpty()) {
            throw new TransactionException("Account must not be null or empty for withdrawal.");
        }
        if (amount == null || amount <= 0) {
            throw new TransactionException("Withdrawal amount must be greater than zero.");
        }

        // 1. Call Account service to update balance using OpenFeign
        BalanceUpdateRequest balanceUpdateRequest = new BalanceUpdateRequest();
        balanceUpdateRequest.setAccountNumber(account);
        balanceUpdateRequest.setAmount(amount);
        balanceUpdateRequest.setTransactionType("WITHDRAW");

        accountClient.updateBalance(balanceUpdateRequest);

        // 2. Save transaction in DB
        Transaction txn = new Transaction();
        txn.setSenderAccount(account);
        txn.setReceiverAccount(account);
        txn.setAmount(amount);
        txn.setTransactionType("WITHDRAW");

        return transactionRepo.save(txn);
    }



@Override
public Transaction transfer(String sender, String receiver, Double amount) {
    if (sender == null || sender.isEmpty()) {
        throw new TransactionException("Sender account must not be null or empty for transfer.");
    }
    if (receiver == null || receiver.isEmpty()) {
        throw new TransactionException("Receiver account must not be null or empty for transfer.");
    }
    if (amount == null || amount <= 0) {
        throw new TransactionException("Transfer amount must be greater than zero.");
    }

    // Create and call TransferRequest via Feign
    TransferRequest request = new TransferRequest();
    request.setFromAccount(sender);
    request.setToAccount(receiver);
    request.setAmount(amount);

    ResponseEntity<String> response = accountClient.transfer(request);

    if (!response.getStatusCode().is2xxSuccessful()) {
        throw new TransactionException("Transfer failed: " + response.getBody());
    }

    // If transfer is successful, log the transaction
    Transaction txn = new Transaction();
    txn.setSenderAccount(sender);
    txn.setReceiverAccount(receiver);
    txn.setAmount(amount);
    txn.setTransactionType("TRANSFER");

    return transactionRepo.save(txn);
}

    @Override
    public List<Transaction> getTransactionsByAccount(String senderAccount) {
        if (senderAccount == null || senderAccount.isEmpty()) {
            throw new TransactionException("Account must not be null or empty.");
        }
        return transactionRepo.findBySenderAccount(senderAccount);
    }
}
