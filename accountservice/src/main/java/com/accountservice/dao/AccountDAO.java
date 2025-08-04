package com.accountservice.dao;

import com.accountservice.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountDAO extends JpaRepository<Account, String> {
	Account findByAccountNumber(String accountNumber);

}
