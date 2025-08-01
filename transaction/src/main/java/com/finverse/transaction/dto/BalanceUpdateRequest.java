package com.finverse.transaction.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class BalanceUpdateRequest {
    private String accountNumber;
    private Double amount;
    private String transactionType;
}
