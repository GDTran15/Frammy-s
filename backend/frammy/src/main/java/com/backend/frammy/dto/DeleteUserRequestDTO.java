package com.backend.frammy.dto;

import jakarta.validation.constraints.NotNull;

public record DeleteUserRequestDTO(
        @NotNull
        Long userId
) {
}
