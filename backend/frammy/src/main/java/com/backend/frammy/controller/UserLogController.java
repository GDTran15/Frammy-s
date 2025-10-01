//@RestController
//@RequestMapping("/api/user-logs")
//public class UserLogController {
//    @Autowired
//    private UserLogService userLogService;
//
//    // Admin: Get ALL logs
//    @GetMapping
//    public List<UserLogDTO> getAllLogs() {
//        return LogService.getAllLogs().stream()
//                .map(UserLogMapper::toDTO)
//                .collect(Collectors.toList());
//    }
//
//    @GetMapping ("/user/{userId}")
//    public List<UserLogDTO> getLogsByUserId(@PathVariable Long userId) {
//        return userLogService.getLogsByUserId(userId).stream()
//                .map(UserLogMapper::toDTO)
//                .collect(Collectors.toList());
//    }
//
//    //Public: Get community feed (only votes, anonymized)
//    @GetMapping("/public")
//    public List<PublicLogDTO> getPublicLogs() {
//        return logService.getPublicLogs();
//    }
//
//    // add new log entry all actions
//    @PostMapping
//    public UserLog createLog(@RequestBody UserLogDTO logDTO) {
//        return userLogService.createLog(log);
//    }
//
//    //delete log (admin only in future)
//    @DeleteMapping("/{id}")
//    public void deleteLog(@PathVariable Long id) {
//        userLogService.deleteLog(id);
//    }
//}