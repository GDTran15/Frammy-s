public class NomineePopularityDTO {
    private Long nomineeId;
    private Integer popularityScore;

    public NomineePopularityDTO(Long nomineeId, Integer popularityScore) {
        this.nomineeId = nomineeId;
        this.popularityScore = popularityScore;
    }

    public Long getNomineeId() { return nomineeId; }
    public void setNomineeId(Long nomineeId) { this.nomineeId = nomineeId; }

    public Integer getPopularityScore() { return popularityScore; }
    public void setPopularityScore(Integer popularityScore) { this.popularityScore = popularityScore; }

    //Add getters setters***
}