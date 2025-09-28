package com.backend.frammy.service;

import com.backend.frammy.dto.AddAlbumDTORequest;
import com.backend.frammy.exception.InvalidInputException;
import com.backend.frammy.exception.ObjectAlreadyExist;
import com.backend.frammy.model.Album;
import com.backend.frammy.model.Artist;
import com.backend.frammy.repo.AlbumRepo;
import com.backend.frammy.repo.ArtistRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepo albumRepo;
    private final ArtistRepo artistRepo;

    @Transactional
    public void createAlbum(@Valid AddAlbumDTORequest addAlbumDTORequest) {
        if (addAlbumDTORequest.artistId() == null) {
            throw new InvalidInputException();
        }
        Artist artist = artistRepo.findByArtistId(addAlbumDTORequest.artistId());
        if (albumRepo.existsAlbumByAlbumNameAndArtist(
                addAlbumDTORequest.albumName(), artist
        )){
            throw new ObjectAlreadyExist("Album already exist");
        }
        Album album = Album.builder()
                .albumName(addAlbumDTORequest.albumName())
                .albumGenre(addAlbumDTORequest.albumGenre())
                .releaseDate(addAlbumDTORequest.releaseDate())
                .artist(artist)
                .build();
        albumRepo.save(album);
    }



}
