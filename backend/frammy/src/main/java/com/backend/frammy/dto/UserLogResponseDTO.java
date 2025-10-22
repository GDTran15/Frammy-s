package com.backend.frammy.dto;

import java.time.LocalDateTime;

public record UserLogResponseDTO(
        Long id,
        String userName,
        String target,
        LocalDateTime timestamp
) {}
