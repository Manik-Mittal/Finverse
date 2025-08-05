package com.bank.cardservice.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.bank.cardservice.dto.AccountDto;

@FeignClient(name = "account-service-client", url = "${account.service.url}")

public interface AccountClient {
	 @GetMapping("/api/accounts/exists/{accountNumber}")
	    boolean doesAccountExist(@PathVariable("accountNumber") String accountNumber);
    @GetMapping("/api/accounts/{accountNumber}")
    AccountDto getAccountDetails(@PathVariable String accountNumber);
    @GetMapping("/api/accounts/user/{userId}")
    List<AccountDto> getAccountsByUserId(@PathVariable Long userId);

   
}
