package com.backend.frammy.controller;

import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.dto.StatisticsResponseDTO;
import com.backend.frammy.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(origins = "http://localhost:3000")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<StatisticsResponseDTO>>> getAllStatistics() {
        List<StatisticsResponseDTO> stats = statisticsService.getAllStatistics();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
