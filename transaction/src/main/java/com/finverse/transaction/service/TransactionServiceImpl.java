package com.finverse.transaction.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finverse.transaction.model.Transaction;
import com.finverse.transaction.repo.TransactionRepo;
import com.finverse.transaction.exception.TransactionException;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepo transactionRepo;

    @Override
    public Transaction deposit(String senderAccount, Double amount) {
        if (senderAccount == null || senderAccount.isEmpty()) {
            throw new TransactionException("Sender account must not be null or empty for deposit.");
        }
        if (amount == null || amount <= 0) {
            throw new TransactionException("Deposit amount must be greater than zero.");
        }

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
