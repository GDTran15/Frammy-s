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
        if (addSongDTORequest.artistId() == null) {
            throw new InvalidInputException();
        }
        Artist artist = artistRepo.findByArtistId(addSongDTORequest.artistId());
        if (songRepo.existsBySongNameAndArtist(addSongDTORequest.songName(),artist)){
            throw new ObjectAlreadyExist("Song Already Exist");
        }
        Song song = Song.builder()
                .songName(addSongDTORequest.songName())
                .songGenre(addSongDTORequest.songGenre())
                .releaseDate(addSongDTORequest.releaseDate())
                .artist(artist)
                .build();

        songRepo.save(song);
    }

    public List<ResponseGetSongDTO> getAllSongs() {
        return songRepo.findAll()
                .stream()
                .map(songToDTO)
                .collect(Collectors.toList());
    }
}
