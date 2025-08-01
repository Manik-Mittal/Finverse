package com.bank.cardservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.bank.cardservice.dto.AccountDto;

@FeignClient(name = "account-service", url = "${account.service.url}")

public interface AccountClient {

    @GetMapping("/api/accounts/{accountNumber}")
    AccountDto getAccountDetails(@PathVariable String accountNumber);
}
