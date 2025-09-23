package com.backend.frammy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "songs")
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long songId;
    private String songName;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @Column(name = "release_date")
    private LocalDate releaseDate;

    private String songGenre;

    @ManyToOne
    @JoinColumn(name = "artist_id", nullable = false)
    private Artist artist;

}
