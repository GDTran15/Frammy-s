package com.backend.frammy.controller;

import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.dto.CreateUserRequestDTO;
import com.backend.frammy.service.UserManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserManagementController {


    private final UserManagementService userManagementService;

    @PostMapping()
    public ResponseEntity<ApiResponse<String>> addUser(@Valid @RequestBody CreateUserRequestDTO createUserRequestDTO){
        userManagementService.createUser(createUserRequestDTO);
        return ResponseEntity.ok(ApiResponse.success("User successfully created"));
    }

}
