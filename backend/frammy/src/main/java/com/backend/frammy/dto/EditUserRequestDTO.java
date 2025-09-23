package com.backend.frammy.dto;

import jakarta.validation.constraints.NotEmpty;

public record EditUserRequestDTO (
        @NotEmpty
        Long userID,
        @NotEmpty
        String username,
        @NotEmpty
        String gmail,
        @NotEmpty
        String password
)
{
}