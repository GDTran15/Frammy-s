package com.backend.frammy.dto;

import com.backend.frammy.model.ConfidenceLevel;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PredictionRequestDTO {
    
    @NotNull(message = "Nominee ID is required")
    private Long nomineeId;
    
    private ConfidenceLevel confidenceLevel;
}
