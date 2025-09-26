package com.backend.frammy.controller;

import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.dto.EditUserRequestDTO;
import com.backend.frammy.dto.DeleteUserRequestDTO;
import com.backend.frammy.dto.UserResponseDTO;
import com.backend.frammy.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @PostMapping("/deleteUser")
    public ResponseEntity<ApiResponse<String>> deleteUserAccount( @Valid @RequestBody DeleteUserRequestDTO deleteRequestDTO) {
        userService.deleteUser(deleteRequestDTO);
        return ResponseEntity.ok(ApiResponse.success("Delete success"));
    }

    @PostMapping("/editUser")
    public ResponseEntity<ApiResponse<String>> editUserAccount( @Valid @RequestBody EditUserRequestDTO editUserRequestDTO) {
        System.out.println("Received Edit Request: " + editUserRequestDTO);
        userService.editUser(editUserRequestDTO);
        return ResponseEntity.ok(ApiResponse.success("User updated successfully"));
    }

    @GetMapping("/getUsers")
    public ResponseEntity<ApiResponse<List<UserResponseDTO>>> getUsers() {
        List<UserResponseDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success(users));
    }
}
