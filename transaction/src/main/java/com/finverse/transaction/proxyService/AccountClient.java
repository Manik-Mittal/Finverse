package com.finverse.transaction.proxyService;
import com.finverse.transaction.dto.AccountDto;
import com.finverse.transaction.dto.BalanceUpdateRequest;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "accountservice", url = "http://localhost:8081")
public interface AccountClient {

    @PutMapping("/update-balance")
    AccountDto updateBalance(@RequestBody BalanceUpdateRequest request);
}
