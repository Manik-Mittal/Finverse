package com.loanService.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoanDto {
	
	private Long id;
	private String accountNumber;
    private BigDecimal loanAmount;
    private String loanType;
    private LocalDate startDate;
    private int termInMonths;
    private double interestRate;
    
    
}
