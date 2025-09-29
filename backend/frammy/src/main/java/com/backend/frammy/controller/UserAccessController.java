package com.backend.frammy.controller;

import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.dto.LoginRequestDTO;
import com.backend.frammy.dto.LoginResponseDTO;
import com.backend.frammy.dto.RegisterRequestDTO;
import com.backend.frammy.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserAccessController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> registerAccountForUser( @Valid @RequestBody RegisterRequestDTO registerRequestDTO){
            userService.createAccountForUser(registerRequestDTO);
            return ResponseEntity.ok(ApiResponse.success("Register success"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDTO>> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO){
        LoginResponseDTO loginResponseDTO = userService.loginUser(loginRequestDTO);
        return ResponseEntity.ok(ApiResponse.success(loginResponseDTO));
    }


}
