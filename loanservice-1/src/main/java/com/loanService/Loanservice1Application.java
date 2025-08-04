package com.loanService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.loanService.feign")
public class Loanservice1Application {

	public static void main(String[] args) {
		SpringApplication.run(Loanservice1Application.class, args);
	}

}
