package com.backend.frammy.repo;

import com.backend.frammy.dto.ResponseGetAllNomineeDTO;
import com.backend.frammy.dto.WeeklyResultSummaryDTO;
import com.backend.frammy.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NomineeRepo extends JpaRepository<Nominee,Long> {
    boolean existsByCategoryAndArtist(Category category, Artist artist);

    Nominee findByNomineeId(Long nomineeId);

    boolean existsByCategoryAndAlbum(Category category, Album album);

    boolean existsByCategoryAndSong(Category category, Song song);


//query to get data
    @Query("""
select new com.backend.frammy.dto.ResponseGetAllNomineeDTO(
            n.nomineeId, n.nomineeType,n.category.categoryId, n.category.categoryName,
             a.artistId,a.artistName, a.artistInfo,
             s.songId, s.songName, s.releaseDate,s.songGenre,
             al.albumId,al.albumName,al.releaseDate,al.albumGenre)
            from Nominee n
            left join n.artist a
            left join n.song s
            left join n.album al
            
""")
    Page<ResponseGetAllNomineeDTO> findAllNominateWithInformation(Pageable pageable);

    //new query for the weekly result summary
    @Query(value = """
        SELECT 
            n.nominee_type,
            CASE 
                WHEN n.nominee_type = 'ARTIST' THEN ar.artist_name
                WHEN n.nominee_type = 'ALBUM' THEN al.album_name
                WHEN n.nominee_type = 'SONG' THEN s.song_name
            END as winner_name,
            CURRENT_DATE,
            CAST(COUNT(v.vote_id) AS bigint)
        FROM nominees n
        LEFT JOIN vote v ON n.nominee_id = v.nominee_id
        LEFT JOIN artists ar ON n.artist_id = ar.artist_id
        LEFT JOIN albums al ON n.album_id = al.album_id
        LEFT JOIN songs s ON n.song_id = s.song_id
        GROUP BY n.nominee_id, n.nominee_type, ar.artist_name, al.album_name, s.song_name
        ORDER BY COUNT(v.vote_id) DESC
    """, nativeQuery = true)
    List<Object[]> findWeeklyResultSummary();


}
