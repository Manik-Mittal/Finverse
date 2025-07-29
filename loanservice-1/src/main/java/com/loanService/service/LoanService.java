package com.loanService.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.loanService.entity.Loan;
import com.loanService.repository.LoanRepository;

@Service
public class LoanService {
	
	@Autowired
	private LoanRepository loanRepository;
	
	public Loan createLoan(Loan loan)
	{
		return loanRepository.save(loan);
	}
	
	public List<Loan> getLoansByAccount(String accountNumber)
	{
		return loanRepository.findByAccountNumber(accountNumber);
	}
	
	public Loan updateLoan(Long id, Loan loan)
	{
		loan.setId(id);
		return loanRepository.save(loan);
	}
	
	public void deleteLoan(Long id)
	{
		loanRepository.deleteById(id);
	}
}

