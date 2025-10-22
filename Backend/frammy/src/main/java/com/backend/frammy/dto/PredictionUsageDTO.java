package com.backend.frammy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PredictionUsageDTO {
    private int predictionsUsedToday;
    private int maxPredictionsPerDay;
    private int predictionsRemaining;
}
