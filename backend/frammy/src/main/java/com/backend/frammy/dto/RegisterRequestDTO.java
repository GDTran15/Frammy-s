package com.backend.frammy.dto;

import jakarta.validation.constraints.NotEmpty;

public record RegisterRequestDTO (
        @NotEmpty
        String username,
        @NotEmpty
        String gmail,
        @NotEmpty
        String password
)
{
}
