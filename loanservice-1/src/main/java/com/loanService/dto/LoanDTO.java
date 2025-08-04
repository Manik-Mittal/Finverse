package com.loanService.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class LoanDTO {
	
	    private Long id;
	    private Long userId;
	    private String accountNumber;
	    private BigDecimal loanAmount;
	    private String loanType;
	    private LocalDate startDate;
	    private int termInMonths;
	    private double interestRate;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public Long getUserId() {
			return userId;
		}
		public void setUserId(Long userId) {
			this.userId = userId;
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
		public LoanDTO(Long id, Long userId, String accountNumber, BigDecimal loanAmount, String loanType,
				LocalDate startDate, int termInMonths, double interestRate) {
			super();
			this.id = id;
			this.userId = userId;
			this.accountNumber = accountNumber;
			this.loanAmount = loanAmount;
			this.loanType = loanType;
			this.startDate = startDate;
			this.termInMonths = termInMonths;
			this.interestRate = interestRate;
		}
	    
	    
}
