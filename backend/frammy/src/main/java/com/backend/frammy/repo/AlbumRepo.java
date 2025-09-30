package com.backend.frammy.repo;

import com.backend.frammy.model.Album;
import com.backend.frammy.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlbumRepo extends JpaRepository<Album,Long> {
    Album findByAlbumId(Long aLong);
    boolean existsAlbumByAlbumNameAndArtist(String albumName, Artist artist);
}
