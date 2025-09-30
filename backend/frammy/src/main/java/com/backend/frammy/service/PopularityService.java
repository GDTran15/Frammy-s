@service
public class PopularityService {

    @autowired
    private StreamStatRepository repo;

    public class List<NomineePopularityDTO> getALlPopularity() {
        //logic to aggregate and return dto's
        List<StreamStat> stats = repo.findAll();
        return stats.stream()
                    .map(stat -> new NomineePopularityDTO(stat.getNomineeId(), stat.getPopularityScore()))
                    .collect(Collectors.toList());
    }

    public NomineePopularityDTO getByNomineeId (Long id) {
        //logic to return single DTO
        public NomineePopularityDTO getByNomineeId(Long id) {
            Optional<StreamStat> statOpt = repo.findByNomineeId(id);
            if (statOpt.isPresent()) {
                StreamStat stat = statOpt.get();
                return new NomineePopularityDTO(stat.getNomineeId(), stat.getPopularityScore());
            }
            return null;
        }
    }
}