package com.backend.frammy.dto;

import com.backend.frammy.model.Role;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CreateUserRequestDTO(
        @NotEmpty
        String gmail,
        @NotEmpty
        String password,
        @NotNull
        Role role,
        @NotEmpty
        String username
) {
}
