//@Service
//public class PopularityService {
//
//    @Autowired
//    private StreamStatRepository repo;
//
//    // Get all stats and convert to DTO
//    public List<NomineePopularityDTO> getAllPopularity() {
//        List<StreamStat> stats = repo.findAll();
//
//        return stats.stream()
//                .map(stat -> new NomineePopularityDTO(
//                        stat.getNomineeId(),
//                        stat.getPopularityScore()
//                ))
//                .collect(Collectors.toList());
//    }
//
//    // Get popularity by *database ID*
//    public NomineePopularityDTO getById(Long id) {
//        return repo.findById(id)
//                .map(stat -> new NomineePopularityDTO(
//                        stat.getNomineeId(),
//                        stat.getPopularityScore()
//                ))
//                .orElse(null);
//    }
//
//    // OR, if you want to look up by nomineeId (not PK)
//    public List<NomineePopularityDTO> getByNomineeId(Long nomineeId) {
//        List<StreamStat> stats = repo.findByNomineeId(nomineeId);
//        return stats.stream()
//                .map(stat -> new NomineePopularityDTO(
//                        stat.getNomineeId(),
//                        stat.getPopularityScore()
//                ))
//                .collect(Collectors.toList());
//    }
//}
