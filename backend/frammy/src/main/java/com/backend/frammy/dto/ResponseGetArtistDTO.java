package com.backend.frammy.dto;

import com.backend.frammy.model.Artist;

import java.util.List;

public record ResponseGetArtistDTO (
        Long artistId,
        String artistName,
        String artistInfo,
        String artistAward
) {
}
