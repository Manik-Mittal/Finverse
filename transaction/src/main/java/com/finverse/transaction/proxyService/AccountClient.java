package com.finverse.transaction.proxyService;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.finverse.transaction.dto.AccountDto;
import com.finverse.transaction.dto.BalanceUpdateRequest;
import com.finverse.transaction.dto.TransferRequest;


@FeignClient(name = "accountservice", url = "http://localhost:8080")
public interface AccountClient {

	@PutMapping("/api/accounts/update-balance")
	AccountDto updateBalance(@RequestBody BalanceUpdateRequest request);

	@PostMapping("/api/accounts/transfer")
	ResponseEntity<String> transfer(@RequestBody TransferRequest request);
}
