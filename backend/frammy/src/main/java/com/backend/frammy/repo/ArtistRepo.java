package com.backend.frammy.repo;

import com.backend.frammy.dto.ResponseGetArtistDTO;
import com.backend.frammy.model.Artist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ArtistRepo extends JpaRepository<Artist,Long> {
    boolean existsByArtistName(String artistName);

    Artist findByArtistId(Long artistId);



    @Query("""
        select new com.backend.frammy.dto.ResponseGetArtistDTO(
                a.artistId,a.artistName,a.artistInfo,a.awards
                ) from Artist a
                        where (:search is null or lower(a.artistName) like lower(concat ('%',:search,'%')))
        """)
    Page<ResponseGetArtistDTO> findAllArtistInPage(Pageable pageable, @Param("search") String search);
}
