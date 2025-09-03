package com.backend.frammy.dto;

import com.backend.frammy.model.Role;
import jakarta.validation.constraints.NotEmpty;

public record CreateUserRequestDTO(
        @NotEmpty
        String gmail,
        @NotEmpty
        String password,
        @NotEmpty
        Role role,
        @NotEmpty
        String username
) {
}
