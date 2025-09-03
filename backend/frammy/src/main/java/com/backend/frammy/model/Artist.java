package com.backend.frammy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "artists")
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long artistId;
    private String artistName;
    private String artistInfo;
    @OneToMany(mappedBy = "artist")
    private List<Song> songs;
    @OneToMany(mappedBy = "artist")
    private List<Album> albums;

}
