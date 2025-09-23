package com.backend.frammy.repo;

import com.backend.frammy.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepo extends JpaRepository<Artist,Long> {

}
