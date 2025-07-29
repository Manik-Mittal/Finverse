package com.loanService.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.loanService.entity.Loan;

public interface LoanRepository extends JpaRepository<Loan, Long> {
	List<Loan> findByAccountNumber(String accountNumber);
}

