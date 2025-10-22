package com.backend.frammy.dto;

import java.time.LocalDateTime;

public record PublicLogDTO(
        Long id,
        String userName,
        String target,
        LocalDateTime timestamp
) {
}
