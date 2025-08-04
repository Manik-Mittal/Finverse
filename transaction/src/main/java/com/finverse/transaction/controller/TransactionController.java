package com.finverse.transaction.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finverse.transaction.dto.DepositRequest;
import com.finverse.transaction.model.Transaction;
import com.finverse.transaction.service.TransactionService;

@RestController
@RequestMapping("api")
public class TransactionController {

  
    private final TransactionService transactionService;
    @Autowired
    public TransactionController(TransactionService transactionService) {
    	this.transactionService=transactionService;
    }
    

    @PostMapping("/deposit")
    public Transaction deposit(@RequestBody DepositRequest request) {
        return transactionService.deposit(request.getSenderAccount(), request.getAmount());
    }

    @PostMapping("/withdraw")
    public Transaction withdraw(@RequestParam String account, @RequestParam Double amount) {
        return transactionService.withdraw(account, amount);
    }

    @PostMapping("/transfer")
    public Transaction transfer(@RequestParam String sender,
                                 @RequestParam String receiver,
                                 @RequestParam Double amount) {
        return transactionService.transfer(sender, receiver, amount);
    }

    @GetMapping("/{account}")
    public List<Transaction> getTransactions(@PathVariable String account) {
        return transactionService.getTransactionsByAccount(account);
    }
}
