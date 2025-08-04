package com.loanService.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.loanService.dto.AccountDto;
import com.loanService.entity.Loan;
import com.loanService.exceptions.LoanNotFoundException;
import com.loanService.exceptions.LoanNotValidException;
import com.loanService.feign.AccountClient;
import com.loanService.repository.LoanRepository;

import feign.FeignException;

@Service
public class LoanServiceImpl implements LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private AccountClient accountClient;

    @Override
    public Loan createLoan(Loan loan) {
        // Validation
        if (loan.getAccountNumber() == null || loan.getAccountNumber().isEmpty()) {
            throw new LoanNotValidException("Account number is required.");
        }
        if (loan.getLoanAmount() == null || loan.getLoanAmount().signum() <= 0) {
            throw new LoanNotValidException("Loan amount must be greater than zero.");
        }
        if (loan.getInterestRate() <= 0) {
            throw new LoanNotValidException("Interest rate must be greater than zero.");
        }
        if (loan.getTermInMonths() <= 0) {
            throw new LoanNotValidException("Term in months must be greater than zero.");
        }
        if (loan.getLoanType() == null || loan.getLoanType().isEmpty()) {
            throw new LoanNotValidException("Loan type is required.");
        }

        // Verify account via Feign client
        try {
            AccountDto account = accountClient.getAccountByNumber(loan.getAccountNumber());
            if (account == null) {
                throw new LoanNotValidException("Account does not exist for number: " + loan.getAccountNumber());
            }
        } catch (FeignException.NotFound e) {
            throw new LoanNotValidException("Account not found: " + loan.getAccountNumber());
        } catch (FeignException e) {
            throw new RuntimeException("Error communicating with Account Service: " + e.getMessage());
        }

        // Save loan
        try {
            return loanRepository.save(loan);
        } catch (Exception e) {
            throw new RuntimeException("Error creating loan: " + e.getMessage(), e);
        }
    }

    @Override
    public List<Loan> getLoansByAccountNumber(String accountNumber) {
        List<Loan> loans = loanRepository.findByAccountNumber(accountNumber);
        if (loans == null || loans.isEmpty()) {
            throw new LoanNotFoundException("No loans exist for account number: " + accountNumber);
        }
        return loans;
    }

    @Override
    public Loan updateLoan(Long id, Loan loan) {
        Loan loanToUpdate = loanRepository.findById(id)
                .orElseThrow(() -> new LoanNotFoundException("No loan exists with loan ID: " + id));
        loanToUpdate.setId(id);
        return loanRepository.save(loanToUpdate);
    }

    @Override
    public void deleteLoan(Long id) {
        if (!loanRepository.existsById(id)) {
            throw new LoanNotFoundException("Cannot delete. Loan ID not found: " + id);
        }
        loanRepository.deleteById(id);
    }

    @Override
    public Loan getLoanById(Long loanId) {
        return loanRepository.findById(loanId)
                .orElseThrow(() -> new LoanNotFoundException("No loan exists with loan ID: " + loanId));
    }

    @Override
    public BigDecimal calculateOutstandingAmount(Long loanId) {
        // Placeholder for future implementation
        return null;
    }

    @Override
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }
}
