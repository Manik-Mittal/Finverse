package com.accountservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.accountservice.model")
@EnableJpaRepositories("com.accountservice.dao")
public class AccountserviceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AccountserviceApplication.class, args);
    }
}
