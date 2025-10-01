package com.backend.frammy.model;

import jakarta.persistence.*;   // for JPA annotations

@Entity
@Table(name = "stream_stats")
public class StreamStat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long nomineeId;
    private Integer popularityScore;

    // Default constructor (required by JPA)
    public StreamStat() {}

    //All-args constructor
    public StreamStat(Long id, Long nomineeId, Integer popularityScore) {
        this.id = id;
        this.nomineeId = nomineeId;
        this.popularityScore = popularityScore;
    }

    //Getters & Setters
    public Long getId() {   // changed to getId()
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getNomineeId() {
        return nomineeId;
    }
    public void setNomineeId(Long nomineeId) {
        this.nomineeId = nomineeId;
    }

    public Integer getPopularityScore() {
        return popularityScore;
    }
    public void setPopularityScore(Integer popularityScore) {
        this.popularityScore = popularityScore;
    }
}
