package com.bank.userservice.controller;



import java.util.logging.Logger;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bank.userservice.dto.AuthRequest;
import com.bank.userservice.dto.AuthResponse;
import com.bank.userservice.dto.SignUpRequest;
import com.bank.userservice.dto.UserDTO;
import com.bank.userservice.service.UserService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*")

//@CrossOrigin(origins = "http://localhost:49712")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @PostMapping("/signup")
    public ResponseEntity<UserDTO> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(signUpRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable(name="id") Long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@Valid @RequestBody AuthRequest authRequest) {
        System.out.println("Authentication request: " + authRequest);
        return ResponseEntity.ok(userService.authenticate(authRequest));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable(name="id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}