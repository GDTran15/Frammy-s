package com.backend.frammy.dto;

import java.time.LocalDate;

public record AddAlbumDTORequest(
        String albumName,
        LocalDate releaseDate,
        String albumGenre,
        Long artistId
) {
}
