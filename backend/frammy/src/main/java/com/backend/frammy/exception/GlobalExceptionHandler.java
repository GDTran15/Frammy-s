package com.backend.frammy.exception;

import com.backend.frammy.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<ApiResponse<String>> userNameAlreadyExist(UserAlreadyExistException ex){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiResponse.error(ex.getMessage()));
    }

    @ExceptionHandler(ObjectAlreadyExist.class)
    public ResponseEntity<ApiResponse<String>> objectAlreadyExist(ObjectAlreadyExist ex){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiResponse.error(ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<String>>  handleValidationException(){
        return     ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error("Please fill in all field"));
    }

    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<ApiResponse<String>>  handleInvalidInputException(){
        return     ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error("Please fill in all field"));
    }
}
