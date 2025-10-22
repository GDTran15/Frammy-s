package com.backend.frammy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record AddAlbumDTORequest(
        @NotBlank(message = "Album name is require")
        String albumName,
        @NotNull(message = "Album release date is require")
        LocalDate releaseDate,
        @NotBlank(message = "Album genre is require")
        String albumGenre,
        @NotNull(message = "Album artist is require")
        Long artistId
) {
}
