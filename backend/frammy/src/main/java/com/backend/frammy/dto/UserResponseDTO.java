package com.backend.frammy.dto;

import com.backend.frammy.model.Role;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record UserResponseDTO(
        @NotEmpty
        Long userId,
        @NotEmpty
        String gmail,
        @NotNull
        Role role,
        @NotEmpty
        String username
) {
}
