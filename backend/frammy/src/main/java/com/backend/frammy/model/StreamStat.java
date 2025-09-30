package com.backend.frammy.model;

public class StreamStat {
    private Long id;
    private Long nomineeId;
    private Integer popularityScore;

    public StreamStat () {
        public StreamStat(Long id, Long nomineeId, Integer popularityScore) {
            this.id = id;
            this.nomineeId = nomineeId;
            this.popularityScore = popularityScore;
        }
    public Long getID(){
            return id;
        }
    public void setId(Long id) {
            this.id = id;
        }
    public void setNomineeId(Long nomineeId) {
            this.nomineeId = nomineeId;
        }
    public Long getNomineeId() {
            return nomineeId;
    }
    public Integer getPopularityScore() {
            return popularityScore;
        }
    public void setPopularityScore(Integer popularityScore) {
            this.popularityScore = popularityScore;
        }
}