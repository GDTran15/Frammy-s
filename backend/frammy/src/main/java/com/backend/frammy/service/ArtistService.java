package com.backend.frammy.service;

import com.backend.frammy.dto.CreateArtistRequestDTO;
import com.backend.frammy.dto.ResponseGetArtistDTO;
import com.backend.frammy.mapper.ArtistToDTO;
import com.backend.frammy.mapper.DtoToArtist;
import com.backend.frammy.model.Artist;

import com.backend.frammy.repo.ArtistRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArtistService {

    private final DtoToArtist dtoToArtist;
    private final ArtistRepo artistRepo;
    private final ArtistToDTO artistToDTO;

    public void createArtist(@Valid CreateArtistRequestDTO createArtistRequestDTO) {
        Artist newArtist = dtoToArtist.apply(createArtistRequestDTO);
        artistRepo.save(newArtist);
    }

    public List<ResponseGetArtistDTO> getAllArtist() {
        return artistRepo.findAll()
                .stream()
                .map(artistToDTO)
                .collect(Collectors.toList());
    }
}
