
@Repository
public interface StreamStatRepository extends JpaRepository<StreamStat, Long> {
    List<StreamStat> findByNomineeId(Long nomineeId);
}