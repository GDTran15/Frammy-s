package com.backend.frammy.dto;

import java.time.LocalDate;

public record ResponseGetAlbumDTO (
        Long albumId,
        String albumName,
        LocalDate releaseDate
) {
}
