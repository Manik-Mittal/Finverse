	package com.example.ServiceRegistary2;

	import org.springframework.boot.SpringApplication;
	import org.springframework.boot.autoconfigure.SpringBootApplication;
	import org.springframework.boot.SpringApplication;
	import org.springframework.boot.autoconfigure.SpringBootApplication;
	import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;


	@EnableEurekaServer
	@SpringBootApplication
	public class ServiceRegistary2Application {

		public static void main(String[] args) {

			SpringApplication.run(ServiceRegistary2Application.class, args);
		}

	}
