package com.backend.frammy.dto;

import java.time.LocalDateTime;

public record UserLogRequestDTO(

        Long userId,
        String userName,
        String target,
        LocalDateTime timestamp
) {}
