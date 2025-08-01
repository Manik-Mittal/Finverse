package com.bank.cardservice.client;

import org.springframework.stereotype.Component;

import com.bank.cardservice.dto.AccountDto;

@Component
public class AccountClientFallback implements AccountClient {
    @Override
    public AccountDto getAccountDetails(String accountNumber) {
        if ("123456789123".equals(accountNumber)) {
            return new AccountDto(accountNumber, "Mock User", "SAVINGS");
        }
        throw new IllegalArgumentException("Mock: Account not found");
    }
}
