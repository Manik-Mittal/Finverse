package com.finverse.transaction.controller;

import com.finverse.transaction.model.Transaction;
import com.finverse.transaction.service.TransactionService;
import com.finverse.transaction.service.TransactionServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class TransactionController {

  
    private final TransactionService transactionService;
    @Autowired
    public TransactionController(TransactionService transactionService) {
    	this.transactionService=transactionService;
    }
    

    @PostMapping("/deposit")
    public Transaction deposit(@RequestParam String senderAccount, @RequestParam Double amount) {
        return transactionService.deposit(senderAccount, amount);
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
