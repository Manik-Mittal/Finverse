package com.loanService.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.loanService.entity.Loan;
import com.loanService.service.LoanService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @PostMapping
    public ResponseEntity<Loan> createLoan(@Valid @RequestBody Loan loan) {
        return new ResponseEntity<>(loanService.createLoan(loan), HttpStatus.CREATED);
    }

    @GetMapping("/account/{accountNumber}")
    public ResponseEntity<List<Loan>> getLoansByAccount(@PathVariable String accountNumber) {
        return ResponseEntity.ok(loanService.getLoansByAccount(accountNumber));
    }

    @GetMapping("findByLoanId/{id}")
    public ResponseEntity<Loan> getLoanById(@PathVariable Long id) {
        return ResponseEntity.ok(loanService.getLoanById(id));
    }

    @PutMapping("updateLoan/{id}")
    public ResponseEntity<Loan> updateLoan(@PathVariable Long id,@Valid @RequestBody Loan loan) {
        return ResponseEntity.ok(loanService.updateLoan(id, loan));
    }

    @DeleteMapping("deleteLoan/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        loanService.deleteLoan(id);
        return ResponseEntity.noContent().build();
    }
}
