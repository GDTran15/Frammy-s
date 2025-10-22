package com.backend.frammy.dto;

import com.backend.frammy.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CreateUserRequestDTO(
        @Email(message = "Email must me valid")
        String gmail,
        @NotEmpty
        String password,
        @NotNull
        Role role,
        @NotEmpty
        String username
) {
}
