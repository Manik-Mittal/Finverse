package com.bank.userservice.service;


import com.bank.userservice.dto.AuthRequest;
import com.bank.userservice.dto.AuthResponse;
import com.bank.userservice.dto.SignUpRequest;
import com.bank.userservice.dto.UserDTO;
import jakarta.validation.Valid;


public interface UserService {
	public UserDTO createUser(com.bank.userservice.dto.@Valid SignUpRequest userDTO) ;

	public UserDTO getUser(Long id) ;

	public AuthResponse authenticate(com.bank.userservice.dto.@Valid AuthRequest authRequest);
	public void deleteUser(Long id);
}