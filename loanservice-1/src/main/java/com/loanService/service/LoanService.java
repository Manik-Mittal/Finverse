package com.loanService.service;

import java.util.List;

import com.loanService.entity.Loan;

public interface LoanService {
    Loan createLoan(Loan loan);
    List<Loan> getLoansByAccount(String accountNumber);
    Loan getLoanById(Long id);
    Loan updateLoan(Long id, Loan loan);
    void deleteLoan(Long id);
}
