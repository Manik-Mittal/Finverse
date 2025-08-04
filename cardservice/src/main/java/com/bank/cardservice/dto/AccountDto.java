package com.bank.cardservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDto {
	 private String accountNumber;
	    private String accountType;
	    private String address;
	    private String email;
	    private String customerName;
	    private String phoneNumber;
}
