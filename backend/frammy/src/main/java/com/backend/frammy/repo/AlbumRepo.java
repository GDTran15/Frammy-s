package com.backend.frammy.repo;

import com.backend.frammy.dto.ResponseGetAlbumDTO;
import com.backend.frammy.model.Album;
import com.backend.frammy.model.Artist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlbumRepo extends JpaRepository<Album,Long> {
    Album findByAlbumId(Long aLong);
    boolean existsAlbumByAlbumNameAndArtist(String albumName, Artist artist);

    @Query("""
    select new com.backend.frammy.dto.ResponseGetAlbumDTO(
    al.albumId,al.albumName,al.releaseDate,al.albumGenre
    ) from Album al
    where (:search is null  or lower(al.albumName) like lower(concat ('%',:search,'%')))
""")
    Page<ResponseGetAlbumDTO> findAllByPageWithSearch(Pageable pageable,@Param("search") String search);
}
