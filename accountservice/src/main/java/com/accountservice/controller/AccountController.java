package com.accountservice.controller;

import com.accountservice.dto.BalanceUpdateRequest;
import com.accountservice.dto.TransferRequest;
import com.accountservice.model.Account;
import com.accountservice.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping
    public Account create(@RequestBody Account account) {
        return accountService.createAccount(account);
    }

    @GetMapping("/{accountNumber}")
    public Account get(@PathVariable String accountNumber) {
        return accountService.getAccount(accountNumber);
    }

    @PutMapping("/{accountNumber}")
    public Account update(@PathVariable String accountNumber, @RequestBody Account account) {
        return accountService.updateAccount(accountNumber, account);
    }

    @DeleteMapping("/{accountNumber}")
    public String delete(@PathVariable String accountNumber) {
        boolean deleted = accountService.deleteAccount(accountNumber);
        return deleted ? "Deleted successfully" : "Account not found";
    }

   // Update Balance: deposit or withdraw
//    @PutMapping("/update-balance")
//    public ResponseEntity<Account> updateBalance(
//            @RequestParam String ACCOUNT_NUMBER,
//            @RequestParam double BALANCE,
//            @RequestParam String transactionType) {
//        try {
//            Account updatedAccount = accountService.updateBalance(ACCOUNT_NUMBER, BALANCE, transactionType);
//            return ResponseEntity.ok(updatedAccount);
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body(null);
//        }
//    }

    @PutMapping("/update-balance")
    public ResponseEntity<Account> updateBalance(@RequestBody BalanceUpdateRequest request) {
        try {
            Account updatedAccount = accountService.updateBalance(
                request.getAccountNumber(),
                request.getAmount(),
                request.getTransactionType()
            );
            return ResponseEntity.ok(updatedAccount);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

//    @PostMapping("/transfer")
//    public ResponseEntity<String> transfer(
//            @RequestParam String fromAccount,
//            @RequestParam String toAccount,
//            @RequestParam double amount) {
//        try {
//            accountService.transfer(fromAccount, toAccount, amount);
//            return ResponseEntity.ok("Transfer successful");
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
    
    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestBody TransferRequest request) {
        try {
            accountService.transfer(request.getFromAccount(), request.getToAccount(), request.getAmount());
            return ResponseEntity.ok("Transfer successful");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}


