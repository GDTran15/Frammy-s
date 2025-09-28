package com.backend.frammy.repo;

import com.backend.frammy.dto.ResponseGetAllNomineeDTO;
import com.backend.frammy.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NomineeRepo extends JpaRepository<Nominee,Long> {
    boolean existsByCategoryAndArtist(Category category, Artist artist);

    boolean existsByCategoryAndAlbum(Category category, Album album);

    boolean existsByCategoryAndSong(Category category, Song song);

    @Query("""
select new com.backend.frammy.dto.ResponseGetAllNomineeDTO(
            n.nomineeId, n.nomineeType, n.category.categoryName,
             a.artistId,a.artistName, a.artistInfo,
             s.songId, s.songName, s.releaseDate,s.songGenre,
             al.albumId,al.albumName,al.releaseDate,al.albumGenre)
            from Nominee n
            left join n.artist a
            left join n.song s
            left join n.album al
            
""")
    Page<ResponseGetAllNomineeDTO> findAllNominateWithInformation(Pageable pageable);
}
