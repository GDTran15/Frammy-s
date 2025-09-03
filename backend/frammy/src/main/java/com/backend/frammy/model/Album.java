package com.backend.frammy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "albums")
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long albumId;
    private String albumName;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @Column(name = "release_date")
    private Date releaseDate;
    @Enumerated(EnumType.STRING)
    private Genre albumGenre;
    @ManyToOne
    @JoinColumn(name = "artist_id", nullable = false)
    private Artist artist;

}
