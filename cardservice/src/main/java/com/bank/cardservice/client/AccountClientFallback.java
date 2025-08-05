package com.bank.cardservice.client;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;

import com.bank.cardservice.dto.AccountDto;

@Component
public class AccountClientFallback implements AccountClient {

    @Override
    public AccountDto getAccountDetails(String accountNumber) {
        if ("123456789123".equals(accountNumber)) {
            return new AccountDto(
                accountNumber,
                "SAVINGS",           // accountType
                "123 Mock Street",   // address
                "mock@example.com",  // email
                "Mock User",         // customerName
                "9999999999"         // phoneNumber
            );
        }
        throw new IllegalArgumentException("Mock: Account not found");
    }
   

    @Override
    public boolean doesAccountExist(String accountNumber) {
        return "123456789123".equals(accountNumber);
    }
    @Override
    public List<AccountDto> getAccountsByUserId(Long userId) {
        return Collections.emptyList();
    }

}
