package com.backend.frammy.controller;

import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.dto.UserLogRequestDTO;
import com.backend.frammy.dto.UserLogResponseDTO;
import com.backend.frammy.service.UserLogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserLogController {

    private final UserLogService userLogService;


    @PostMapping("/logs")
    public ResponseEntity<ApiResponse<String>> createLog(@RequestBody @Valid UserLogRequestDTO dto) {
        userLogService.createUserLog(dto);
        return ResponseEntity.ok(ApiResponse.success("Log created successfully"));
    }


    @GetMapping("/logs")
    public ResponseEntity<ApiResponse<PagedModel<UserLogResponseDTO>>> getAllLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        var paged = userLogService.getAllLogs(pageable);
        return ResponseEntity.ok(ApiResponse.success(new PagedModel<>(paged)));
    }

    @DeleteMapping("/logs/{id}")
    public ResponseEntity<ApiResponse<String>> deleteLog(@PathVariable Long id) {
        userLogService.deleteUserLog(id);
        return ResponseEntity.ok(ApiResponse.success("Log deleted successfully"));
    }

    @GetMapping("/public-logs")
    public List<UserLogResponseDTO> getPublicLogs() {
        return userLogService.getPublicLogs();
    }

    @GetMapping("/logs/user/{userId}")
    public List<UserLogResponseDTO> getUserLogs(@PathVariable Long userId) {
        return userLogService.getUserLogs(userId);
    }
}
