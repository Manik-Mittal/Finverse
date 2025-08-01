package com.finverse.transaction.dto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BalanceUpdateRequest {
    private String accountNumber;
    private Double amount;
    private String transactionType;
}