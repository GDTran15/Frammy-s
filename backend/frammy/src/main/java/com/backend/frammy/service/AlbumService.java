package com.backend.frammy.service;

import com.backend.frammy.dto.AddAlbumDTORequest;
import com.backend.frammy.dto.ResponseGetAlbumDTO;
import com.backend.frammy.exception.InvalidInputException;
import com.backend.frammy.exception.ObjectAlreadyExist;
import com.backend.frammy.mapper.AlbumToDTO;
import com.backend.frammy.model.Album;
import com.backend.frammy.model.Artist;
import com.backend.frammy.repo.AlbumRepo;
import com.backend.frammy.repo.ArtistRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepo albumRepo;
    private final ArtistRepo artistRepo;
    private final AlbumToDTO albumToDTO;

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


    public List<ResponseGetAlbumDTO> getAlbums() {
          return  albumRepo.findAll()
                    .stream().map(albumToDTO)
                    .collect(Collectors.toList());
    }

    public Page<ResponseGetAlbumDTO> getAlbumInPage(Pageable pageable) {
        Page<Album> albumPage = albumRepo.findAll(pageable);
        List<ResponseGetAlbumDTO> albumDTOList = albumPage.stream().map(albumToDTO)
                .toList();

        return new PageImpl<>(albumDTOList,pageable,albumPage.getTotalElements());
    }

    public void updateAlbum(@Valid AddAlbumDTORequest addAlbumDTORequest, Long albumId) {
            Album album = albumRepo.findByAlbumId(albumId);
            album.setAlbumName(addAlbumDTORequest.albumName());
            album.setAlbumGenre(addAlbumDTORequest.albumGenre());
            album.setReleaseDate(addAlbumDTORequest.releaseDate());
            album.setArtist(artistRepo.findByArtistId(addAlbumDTORequest.artistId()));
            albumRepo.save(album);
    }
}
