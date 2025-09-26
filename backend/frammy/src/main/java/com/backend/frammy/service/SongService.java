package com.backend.frammy.service;

import com.backend.frammy.dto.AddSongDTORequest;
import com.backend.frammy.dto.ResponseGetSongDTO;
import com.backend.frammy.mapper.SongToDTO;
import com.backend.frammy.model.Song;
import com.backend.frammy.repo.ArtistRepo;
import com.backend.frammy.repo.SongRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongRepo songRepo;
    private final ArtistRepo artistRepo;
    private final SongToDTO songToDTO;

    public void createSong(@Valid AddSongDTORequest addSongDTORequest) {
        Song song = Song.builder()
                .songName(addSongDTORequest.songName())
                .songGenre(addSongDTORequest.songGenre())
                .releaseDate(addSongDTORequest.releaseDate())
                .build();
        artistRepo.findByArtistId(addSongDTORequest.artistId())
                .ifPresent(song::setArtist);
        songRepo.save(song);
    }

    public List<ResponseGetSongDTO> getAllSongs() {
        return songRepo.findAll()
                .stream()
                .map(songToDTO)
                .collect(Collectors.toList());
    }
}
