package com.backend.frammy.dto;

import com.backend.frammy.model.Role;

public record LoginResponseDTO(
        String token,
        Role role
) {
}
