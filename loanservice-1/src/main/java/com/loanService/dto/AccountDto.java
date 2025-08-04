package com.loanService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDto {
    private String accountNumber;
    private String accountHolderName;
    private Double balance;
    private String accountType;
}
