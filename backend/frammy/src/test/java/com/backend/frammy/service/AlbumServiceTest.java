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
import com.backend.frammy.service.AlbumService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AlbumServiceTest {

    @Mock private AlbumRepo albumRepo;
    @Mock private ArtistRepo artistRepo;
    @Mock private AlbumToDTO albumToDTO;

    @InjectMocks private AlbumService albumService;

    private Artist artist;

    @BeforeEach
    void setup() {
        artist = new Artist();
        artist.setArtistId(1L);
        lenient().when(artistRepo.findByArtistId(1L)).thenReturn(artist);
    }

    @Test
    void createAlbum_success() {
        AddAlbumDTORequest dto = new AddAlbumDTORequest("Album1", LocalDate.now(), "Pop", artist.getArtistId() );
        when(albumRepo.existsAlbumByAlbumNameAndArtist("Album1", artist)).thenReturn(false);

        albumService.createAlbum(dto);

        verify(albumRepo).save(any(Album.class));
    }




    @Test
    void getAlbums_success() {
        Album album = new Album();
        album.setAlbumName("Album1");
        when(albumRepo.findAll()).thenReturn(List.of(album));
        when(albumToDTO.apply(album)).thenReturn(new ResponseGetAlbumDTO(1L,"Album1",LocalDate.now(),"Pop"));

        List<ResponseGetAlbumDTO> result = albumService.getAlbums();

        assertThat(result).hasSize(1);
    }

    @Test
    void getAlbumInPage_success() {
        Album album = new Album();
        album.setAlbumName("Album1");
        Page<Album> albumPage = new PageImpl<>(List.of(album));
        PageRequest pageable = PageRequest.of(0, 10);

        when(albumRepo.findAll(pageable)).thenReturn(albumPage);
        when(albumToDTO.apply(album)).thenReturn(new ResponseGetAlbumDTO(1L,"Album1",LocalDate.now(),"Pop"));

        Page<ResponseGetAlbumDTO> result = albumService.getAlbumInPage(pageable);

        assertThat(result.getContent()).hasSize(1);
    }
}
