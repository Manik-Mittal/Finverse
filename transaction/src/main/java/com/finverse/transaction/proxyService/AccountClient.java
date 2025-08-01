package com.finverse.transaction.proxyService;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.finverse.transaction.dto.AccountDto;

@FeignClient(name = "account-service") // If using Eureka. Otherwise add url=...
public interface AccountClient {

    @PutMapping("/accounts/{accountNumber}/balance")
    void updateBalance(@PathVariable String accountNumber, @RequestParam Double amount);

    @GetMapping("/accounts/{accountNumber}")
    AccountDto getAccount(@PathVariable String accountNumber);
} 
 
 
 
 
 