package com.loanService.entity;

import java.math.BigDecimal;
import java.time.LocalDate;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;
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

    @NotBlank(message = "Account number cannot be blank")
    @Size(min = 5, max = 20, message = "Account number must be between 5 and 20 characters")
    @Column(name = "account_number", nullable = false)
    private String accountNumber;

    @NotNull(message = "Loan amount is required")
    @DecimalMin(value = "1000.00", message = "Loan amount must be at least 1000.00")
    @Column(name = "loan_amount", nullable = false)
    private BigDecimal loanAmount;

    @NotBlank(message = "Loan type cannot be blank")
    @Column(name = "loan_type", nullable = false)
    private String loanType;

    @NotNull(message = "Start date is required")
    @PastOrPresent(message = "Start date cannot be in the future")
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Min(value = 1, message = "Term must be at least 1 month")
    @Max(value = 360, message = "Term cannot exceed 360 months")
    @Column(name = "term_in_months", nullable = false)
    private int termInMonths;

    @DecimalMin(value = "0.0", inclusive = false, message = "Interest rate must be positive")
    @DecimalMax(value = "100.0", message = "Interest rate cannot exceed 100%")
    @Column(name = "interest_rate")
    private double interestRate;
}
