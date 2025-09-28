package com.backend.frammy.mapper;

import com.backend.frammy.dto.ResponseGetArtistDTO;
import com.backend.frammy.model.Artist;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class ArtistToDTO implements Function<Artist, ResponseGetArtistDTO> {
    @Override
    public ResponseGetArtistDTO apply(Artist artist) {
        return  new ResponseGetArtistDTO(
                artist.getArtistId(),
                artist.getArtistName(),
                artist.getArtistInfo(),
                artist.getAwards()
        );
    }
}
