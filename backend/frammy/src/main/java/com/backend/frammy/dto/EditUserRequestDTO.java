package com.backend.frammy.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record EditUserRequestDTO (
        @NotNull
        Long userId,
        @NotEmpty
        String username,
        @NotEmpty
        String gmail,
        @NotEmpty
        String password
)
{
}