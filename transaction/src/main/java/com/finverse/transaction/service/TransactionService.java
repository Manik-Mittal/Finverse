package com.finverse.transaction.service;

import com.finverse.transaction.model.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction deposit(String senderAccount, Double amount);

    Transaction withdraw(String account, Double amount);

    Transaction transfer(String sender, String receiver, Double amount);

    List<Transaction> getTransactionsByAccount(String account);
}
