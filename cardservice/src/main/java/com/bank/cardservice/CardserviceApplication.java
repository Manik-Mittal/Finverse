package com.bank.cardservice;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.bank.cardservice.client")
@EnableDiscoveryClient
public class CardserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CardserviceApplication.class, args);
	}

}
