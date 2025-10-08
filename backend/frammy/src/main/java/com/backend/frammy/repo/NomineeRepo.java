package com.backend.frammy.repo;

import com.backend.frammy.dto.ResponseGetAllNomineeDTO;
import com.backend.frammy.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
            where (:categoryId is null or n.category.categoryId = :categoryId)
            and (
                :search is null or
                 (n.nomineeType = 'ARTIST' and lower(a.artistName) like lower(concat ('%',:search,'%')))
                 or
                 (n.nomineeType = 'SONG' and lower(s.songName) like lower(concat ('%',:search,'%')))
                 or
                 (n.nomineeType = 'ALBUM' and lower(al.albumName) like lower(concat ('%',:search,'%')))
             
            )
""")
    Page<ResponseGetAllNomineeDTO> findAllNominateWithInformation(Pageable pageable, @Param("categoryId") Long categoryId,@Param("search") String search);
}
