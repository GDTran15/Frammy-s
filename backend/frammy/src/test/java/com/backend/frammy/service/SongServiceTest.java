package com.backend.frammy.service;

import com.backend.frammy.dto.AddSongDTORequest;
import com.backend.frammy.dto.ResponseGetSongDTO;
import com.backend.frammy.exception.InvalidInputException;
import com.backend.frammy.exception.ObjectAlreadyExist;
import com.backend.frammy.mapper.SongToDTO;
import com.backend.frammy.model.Artist;
import com.backend.frammy.model.Song;
import com.backend.frammy.repo.ArtistRepo;
import com.backend.frammy.repo.SongRepo;
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
public class SongServiceTest {

    @Mock private SongRepo songRepo;
    @Mock private ArtistRepo artistRepo;
    @Mock private SongToDTO songToDTO;

    @InjectMocks private SongService songService;

    private Artist artist;

    @BeforeEach
    void setup() {
        artist = new Artist();
        artist.setArtistId(1L);
        lenient().when(artistRepo.findByArtistId(1L)).thenReturn(artist);
    }

    @Test
    void createSong_success() {
        AddSongDTORequest dto = new AddSongDTORequest( "Song1", LocalDate.now(), "Pop", artist.getArtistId());
        when(songRepo.existsBySongNameAndArtist("Song1", artist)).thenReturn(false);

        songService.createSong(dto);

        verify(songRepo, times(1)).save(any(Song.class));
    }

    @Test
    void createSong_missingArtist_invalidExceptionThrow() {
        AddSongDTORequest dto = new AddSongDTORequest("Song1", LocalDate.now(), "Pop", null);

        assertThrows(InvalidInputException.class, () -> songService.createSong(dto));
        verify(songRepo, never()).save(any());
    }

    @Test
    void createSong_alreadyExist_objectAlreadyExceptionThrow() {
        AddSongDTORequest dto = new AddSongDTORequest("Song1", LocalDate.now(), "Pop", artist.getArtistId());
        when(songRepo.existsBySongNameAndArtist("Song1", artist)).thenReturn(true);

        assertThrows(ObjectAlreadyExist.class, () -> songService.createSong(dto));
    }

    @Test
    void getAllSongs_success() {
        Song song = new Song();
        song.setSongName("Song1");
        when(songRepo.findAll()).thenReturn(List.of(song));
        when(songToDTO.apply(song)).thenReturn(new ResponseGetSongDTO(1L,"Song1",LocalDate.now(),"Pop"));

        List<ResponseGetSongDTO> result = songService.getAllSongs();

        assertThat(result).hasSize(1);
        verify(songRepo).findAll();
    }

    @Test
    void deleteSong_success() {
        songService.deleteSong(1L);
        verify(songRepo).deleteById(1L);
    }

    @Test
    void getSongInPage_success() {
        Song song = new Song();
        song.setSongName("Song1");
        Page<Song> songPage = new PageImpl<>(List.of(song));
        PageRequest pageable = PageRequest.of(0, 10);

        when(songRepo.findAll(pageable)).thenReturn(songPage);
        when(songToDTO.apply(song)).thenReturn(new ResponseGetSongDTO(1L,"Song1",LocalDate.now(),"Pop"));

        Page<ResponseGetSongDTO> result = songService.getSongInPage(pageable);

        assertThat(result.getContent()).hasSize(1);
    }
}