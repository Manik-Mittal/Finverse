package com.loanService.service;

import java.math.BigDecimal;
import java.util.List;

import com.loanService.entity.Loan;

public interface LoanService {
	
	public List<Loan> getAllLoans();
	public Loan createLoan(Loan loan);
	public List<Loan> getLoansByAccountNumber(String accountNumber);
	public Loan updateLoan(Long id, Loan loan);
	public void deleteLoan(Long id);
	
	//Get Loan by Loan ID: Retrieve loan details using the unique loan ID.
	public Loan getLoanById(Long loanId);
	
	//Get loans by userId
	public List<Loan> getLoansByUserId(Long userId);
	
	public BigDecimal calculateOutstandingAmount(Long loanId);
}
