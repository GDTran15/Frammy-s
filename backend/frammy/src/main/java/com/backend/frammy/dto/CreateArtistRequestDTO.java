package com.backend.frammy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record CreateArtistRequestDTO(
        @NotBlank(message = "Artist name is require")
        String artistName,

        String artistInfo,

        String awards
) {
}
