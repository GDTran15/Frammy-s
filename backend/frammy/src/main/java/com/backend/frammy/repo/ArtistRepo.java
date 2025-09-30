package com.backend.frammy.repo;

import com.backend.frammy.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArtistRepo extends JpaRepository<Artist,Long> {
    boolean existsByArtistName(String artistName);

    Artist findByArtistId(Long artistId);
}
