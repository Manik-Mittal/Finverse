package com.finverse.transaction.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finverse.transaction.model.Transaction;
import com.finverse.transaction.repo.TransactionRepo;

@Service
public class TransactionServiceImpl implements TransactionService {

@Autowired
private TransactionRepo transactionRepo;

@Override
public Transaction deposit(String account, Double amount) {
    Transaction txn = new Transaction();
    txn.setReceiverAccount(account);
    txn.setAmount(amount);
    txn.setTransactionType("DEPOSIT");
    return transactionRepo.save(txn);
}

@Override
public Transaction withdraw(String account, Double amount) {
    Transaction txn = new Transaction();
    txn.setSenderAccount(account);
    txn.setAmount(amount);
    txn.setTransactionType("WITHDRAW");
    return transactionRepo.save(txn);
}

@Override
public Transaction transfer(String sender, String receiver, Double amount) {
    Transaction txn = new Transaction();
    txn.setSenderAccount(sender);
    txn.setReceiverAccount(receiver);
    txn.setAmount(amount);
    txn.setTransactionType("TRANSFER");
    return transactionRepo.save(txn);
}

@Override
public List<Transaction> getTransactionsByAccount(String account) {
    return transactionRepo.findBySenderAccountOrReceiverAccount(account, account);
}
}