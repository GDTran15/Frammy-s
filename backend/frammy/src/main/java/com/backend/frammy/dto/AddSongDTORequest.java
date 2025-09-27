package com.backend.frammy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record AddSongDTORequest(
        @NotBlank
        String songName,
        @NotNull
        LocalDate releaseDate,
        @NotBlank
        String songGenre,
        Long artistId

) {
}
