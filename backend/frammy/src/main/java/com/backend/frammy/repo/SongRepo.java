package com.backend.frammy.repo;

import com.backend.frammy.dto.ResponseGetSongDTO;
import com.backend.frammy.model.Album;
import com.backend.frammy.model.Artist;
import com.backend.frammy.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SongRepo extends JpaRepository<Song,Long> {
    Song findBySongId(Long songId);

    boolean existsBySongNameAndArtist(String songName, Artist artist);


    @Query("""
    select new com.backend.frammy.dto.ResponseGetSongDTO(
    s.songId,s.songName,s.releaseDate,s.songGenre
    ) from Song s
    where (:search is null  or lower(s.songName) like lower(concat ('%',:search,'%')))
""")
    Page<ResponseGetSongDTO> findAllSongInPageWithSearch(Pageable pageable,@Param("search") String search);
}
