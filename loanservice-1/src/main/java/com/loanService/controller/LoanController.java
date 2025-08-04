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

import com.loanService.dto.LoanDTO;
import com.loanService.entity.Loan;
import com.loanService.service.LoanServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanServiceImpl loanService;
    
    @GetMapping("/getAllLoans")
    public ResponseEntity<List<Loan>> getAllLoans()
    {
    	return ResponseEntity.status(HttpStatus.OK).body(loanService.getAllLoans());
    }

    @PostMapping("/addLoan")
    public ResponseEntity<Loan> createLoan(@Valid @RequestBody Loan loan) {
        return new ResponseEntity<>(loanService.createLoan(loan), HttpStatus.CREATED);
    }

    @GetMapping("getByAccNo/{accountNumber}")
    public ResponseEntity<List<Loan>> getLoansByAccount(@PathVariable String accountNumber) {
        return ResponseEntity.ok(loanService.getLoansByAccountNumber(accountNumber));
    }

    @GetMapping("getByLoanId/{loanId}")
    public ResponseEntity<LoanDTO> getLoansByLoanId(@PathVariable Long loanId) {
    	Loan loan = loanService.getLoanById(loanId);
    	LoanDTO dto = new LoanDTO(
    		    loan.getId(),
    		    loan.getUserId(),
    		    loan.getAccountNumber(),
    		    loan.getLoanAmount(),
    		    loan.getLoanType(),
    		    loan.getStartDate(),
    		    loan.getTermInMonths(),
    		    loan.getInterestRate()
    		);
        return ResponseEntity.ok(dto);
    }
    
    @GetMapping("getByUserId/{userId}")
    public ResponseEntity<List<Loan>> getLoansByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(loanService.getLoansByUserId(userId));
    }
    
    
    @PutMapping("/{id}")
    public ResponseEntity<Loan> updateLoan(@PathVariable Long id,@Valid @RequestBody Loan loan) {
        return ResponseEntity.ok(loanService.updateLoan(id, loan));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        loanService.deleteLoan(id);
        return ResponseEntity.noContent().build();
    }
}
