package com.loanService.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.loanService.entity.Loan;
import com.loanService.exceptions.LoanNotFoundException;
import com.loanService.repository.LoanRepository;

@Service
public class LoanServiceImpl implements LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Override
    public Loan createLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    @Override
    public List<Loan> getLoansByAccount(String accountNumber) {
        return loanRepository.findByAccountNumber(accountNumber);
    }

    @Override
    public Loan getLoanById(Long id) {
        return loanRepository.findById(id)
                .orElseThrow(() -> new LoanNotFoundException("Loan not found with id " + id));
    }

    @Override
    public Loan updateLoan(Long id, Loan loanDetails) {
        Loan loan = getLoanById(id);
        loan.setLoanAmount(loanDetails.getLoanAmount());
        loan.setInterestRate(loanDetails.getInterestRate());
        loan.setTermInMonths(loanDetails.getTermInMonths());
        return loanRepository.save(loan);
    }

    @Override
    public void deleteLoan(Long id) {
        Loan loan = getLoanById(id);
        loanRepository.delete(loan);
    }
}
