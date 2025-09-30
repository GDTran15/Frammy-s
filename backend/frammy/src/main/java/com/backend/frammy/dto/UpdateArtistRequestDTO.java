package com.backend.frammy.dto;

import jakarta.validation.constraints.NotEmpty;

public record UpdateArtistRequestDTO(
        @NotEmpty
        String artistName,
        @NotEmpty
        String artistInfo,
        String awards
) {
}
