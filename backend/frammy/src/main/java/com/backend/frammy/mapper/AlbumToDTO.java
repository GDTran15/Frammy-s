package com.backend.frammy.mapper;

import com.backend.frammy.dto.ResponseGetAlbumDTO;
import com.backend.frammy.dto.ResponseGetSongDTO;

import com.backend.frammy.model.Album;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public  class AlbumToDTO implements Function<Album, ResponseGetAlbumDTO> {
    @Override
    public ResponseGetAlbumDTO apply(Album album) {
        return new ResponseGetAlbumDTO(
                album.getAlbumId(),
                album.getAlbumName(),
                album.getReleaseDate(),
                album.getAlbumGenre()
        );
    }
}
