package com.loanService.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "loans")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Loan {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "account_number", nullable = false)
	private String accountNumber;
	
	@Column(name = "loan_amount",nullable = false)
    private BigDecimal loanAmount;
	
	@Column(name = "loan_type",nullable = false)
    private String loanType;
	
	@Column(name = "start_date",nullable = false)
    private LocalDate startDate;
	
	@Column(name = "term_in_months",nullable = false)
    private int termInMonths;
	
	@Column(name = "interest_rate")
    private double interestRate;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	public BigDecimal getLoanAmount() {
		return loanAmount;
	}
	public void setLoanAmount(BigDecimal loanAmount) {
		this.loanAmount = loanAmount;
	}
	public String getLoanType() {
		return loanType;
	}
	public void setLoanType(String loanType) {
		this.loanType = loanType;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public int getTermInMonths() {
		return termInMonths;
	}
	public void setTermInMonths(int termInMonths) {
		this.termInMonths = termInMonths;
	}
	public double getInterestRate() {
		return interestRate;
	}
	public void setInterestRate(double interestRate) {
		this.interestRate = interestRate;
	}
    
    
}
