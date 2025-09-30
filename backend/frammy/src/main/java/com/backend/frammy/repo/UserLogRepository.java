@Repository

public interface UserLogRepository extends JpaRepository<UserLog, Long> {
    List<UserLog> findByUserId(Long userId);
    List<UserLog> findByAction(String action);
    // uses spring data JPA for DB operations
}