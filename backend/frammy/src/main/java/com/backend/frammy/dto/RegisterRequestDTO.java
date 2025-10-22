package com.backend.frammy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record RegisterRequestDTO (
        @NotBlank (message = "Please enter your username")
        String username,
        @Email (message = "Gmail invalid")
        @NotBlank (message = "Please enter your gmail")
        String gmail,
        @NotBlank(message = "Please enter your password")
        String password
)
{
}
