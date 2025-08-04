package com.loanService.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.loanService.dto.AccountDto;

@FeignClient(name = "account-service", url = "http://localhost:8080")
public interface AccountClient {
    @GetMapping("/api/accounts/{accountNumber}")
    AccountDto getAccountByNumber(@PathVariable("accountNumber") String accountNumber);
}
