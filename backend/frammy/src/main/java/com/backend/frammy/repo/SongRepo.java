package com.backend.frammy.repo;

import com.backend.frammy.model.Album;
import com.backend.frammy.model.Artist;
import com.backend.frammy.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SongRepo extends JpaRepository<Song,Long> {
    Song findBySongId(Long songId);

    boolean existsBySongNameAndArtist(String songName, Artist artist);
    
}
