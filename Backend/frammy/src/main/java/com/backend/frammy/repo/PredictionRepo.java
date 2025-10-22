package com.backend.frammy.repo;

import com.backend.frammy.model.Prediction;
import com.backend.frammy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PredictionRepo extends JpaRepository<Prediction, Long> {
    
    // Count predictions made by user on a specific date
    @Query("SELECT COUNT(p) FROM Prediction p WHERE p.user = :user AND p.predictionPeriod = :date")
    long countByUserAndPredictionPeriod(@Param("user") User user, @Param("date") LocalDate date);
    
    // Check if user already predicted for a specific nominee on a date
    boolean existsByUserAndNomineeAndPredictionPeriod(User user, com.backend.frammy.model.Nominee nominee, LocalDate date);
    
    // Get all predictions by user for a specific date
    List<Prediction> findByUserAndPredictionPeriod(User user, LocalDate date);
    
    // Get prediction results (count predictions per nominee)
    @Query(value = """
        SELECT 
            n.nominee_id,
            n.nominee_type,
            c.category_name,
            CASE 
                WHEN n.nominee_type = 'ARTIST' THEN ar.artist_name
                WHEN n.nominee_type = 'ALBUM' THEN al.album_name
                WHEN n.nominee_type = 'SONG' THEN s.song_name
            END as nominee_name,
            CAST(COUNT(p.prediction_id) AS bigint) as prediction_count
        FROM nominees n
        LEFT JOIN predictions p ON n.nominee_id = p.nominee_id
        LEFT JOIN categories c ON n.category_id = c.category_id
        LEFT JOIN artists ar ON n.artist_id = ar.artist_id
        LEFT JOIN albums al ON n.album_id = al.album_id
        LEFT JOIN songs s ON n.song_id = s.song_id
        GROUP BY n.nominee_id, n.nominee_type, c.category_name, ar.artist_name, al.album_name, s.song_name
        ORDER BY prediction_count DESC
    """, nativeQuery = true)
    List<Object[]> findPredictionResults();
}
