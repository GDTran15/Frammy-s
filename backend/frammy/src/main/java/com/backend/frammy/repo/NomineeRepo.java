package com.backend.frammy.repo;

import com.backend.frammy.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NomineeRepo extends JpaRepository<Nominee,Long> {
    boolean existsByCategoryAndArtist(Category category, Artist artist);

    boolean existsByCategoryAndAlbum(Category category, Album album);

    boolean existsByCategoryAndSong(Category category, Song song);
}
