package com.backend.frammy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record AddSongDTORequest(
        @NotBlank(message = "Song name is require")
        String songName,
        @NotNull(message = "Song release date is require")
        LocalDate releaseDate,
        @NotBlank(message = "Song genre is require")
        String songGenre,
        @NotNull(message = "Song artist is require")
        Long artistId

) {
}
