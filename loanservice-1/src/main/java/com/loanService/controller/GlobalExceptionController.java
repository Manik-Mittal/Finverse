package com.loanService.controller;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.loanService.dto.ErrorDto;
import com.loanService.exceptions.LoanNotFoundException;

@RestControllerAdvice
public class GlobalExceptionController {
	
	@ExceptionHandler(LoanNotFoundException.class)
	ResponseEntity<ErrorDto> handle404(LoanNotFoundException ex)
	{
		ErrorDto err = new ErrorDto();
		err.setErrMsg(ex.getMessage());
		err.setStatusCode(HttpStatus.NOT_FOUND.toString());
		err.setTimestamp(LocalDateTime.now());
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	ResponseEntity<ErrorDto> handle400(MethodArgumentNotValidException ex)
	{
		String errMsg = ex.getBindingResult()
						.getAllErrors()
						.stream().map(e -> e.getDefaultMessage())
						.collect(Collectors.joining(","));
		ErrorDto err = new ErrorDto();
		err.setErrMsg(errMsg);
		err.setStatusCode(HttpStatus.BAD_REQUEST.toString());
		err.setTimestamp(LocalDateTime.now());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}
	
	@ExceptionHandler(Exception.class)
	ResponseEntity<ErrorDto> handle500(Exception ex)
	{
		ErrorDto err = new ErrorDto();
		err.setErrMsg(ex.getMessage());
		err.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.toString());
		err.setTimestamp(LocalDateTime.now());
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
	}
}
