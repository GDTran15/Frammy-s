package com.backend.frammy.dto;

import java.time.LocalDateTime;

public record UserLogRequestDTO(
        String userName,
        String target,
        LocalDateTime timestamp
) {}
