package com.backend.frammy.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
        @NotBlank(message = "Please enter your username")
        String username,
        @NotBlank(message = "Please enter your password")
        String password
) {
}
