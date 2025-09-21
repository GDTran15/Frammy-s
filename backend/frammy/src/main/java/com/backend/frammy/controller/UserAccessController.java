package com.backend.frammy.controller;

import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.dto.RegisterRequestDTO;
import com.backend.frammy.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserAccessController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> registerAccountForUser(RegisterRequestDTO registerRequestDTO){
            userService.createAccountForUser(registerRequestDTO);
            return ResponseEntity.ok(ApiResponse.success("Register success"));
    }
}
