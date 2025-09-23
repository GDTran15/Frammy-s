package com.backend.frammy.service;

import com.backend.frammy.dto.CreateArtistRequestDTO;
import com.backend.frammy.dto.ResponseGetArtistDTO;
import com.backend.frammy.dto.UpdateArtistRequestDTO;
import com.backend.frammy.mapper.ArtistToDTO;
import com.backend.frammy.mapper.DtoToArtist;
import com.backend.frammy.model.Artist;

import com.backend.frammy.repo.ArtistRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArtistService {

    private final DtoToArtist dtoToArtist;
    private final ArtistRepo artistRepo;
    private final ArtistToDTO artistToDTO;

    public Artist createArtist(@Valid CreateArtistRequestDTO createArtistRequestDTO) {
        Artist newArtist = dtoToArtist.apply(createArtistRequestDTO);
        return artistRepo.save(newArtist);
    }

    public List<ResponseGetArtistDTO> getAllArtist() {
        return artistRepo.findAll()
                .stream()
                .map(artistToDTO)
                .collect(Collectors.toList());
    }

    public void updateArtist(Long artistId, @Valid UpdateArtistRequestDTO updateArtistRequestDTO) {
        Artist artist = artistRepo.findByArtistId(artistId)
                .orElseThrow(() -> new ObjectNotFoundException("Artist not found", artistId));
        artist.setArtistName(updateArtistRequestDTO.artistName());
        artist.setArtistInfo(updateArtistRequestDTO.artistInfo());
        artist.setAwards(updateArtistRequestDTO.awards());
        artistRepo.save(artist);
    }

    public void deleteArtist(Long artistId) {
        artistRepo.deleteById(artistId);
    }
}
