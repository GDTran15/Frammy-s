package com.backend.frammy.controller;

import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.dto.PredictionRequestDTO;
import com.backend.frammy.dto.PredictionUsageDTO;
import com.backend.frammy.service.PredictionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/prediction")
public class PredictionController {

    private final PredictionService predictionService;

    @PostMapping()
    public ResponseEntity<ApiResponse<String>> addPrediction(
            @RequestHeader("Authorization") String authorization,
            @Valid @RequestBody PredictionRequestDTO predictionRequestDTO) {

        predictionService.createPrediction(predictionRequestDTO, authorization);
        return ResponseEntity.ok(ApiResponse.success("Prediction successfully created"));
    }

    @GetMapping("/usage")
    public ResponseEntity<ApiResponse<PredictionUsageDTO>> getUsage(
            @RequestHeader("Authorization") String authorization) {

        return ResponseEntity.ok(ApiResponse.success(predictionService.getDailyUsage(authorization)));
    }
}
