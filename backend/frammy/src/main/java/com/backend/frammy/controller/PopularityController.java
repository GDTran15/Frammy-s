@RestController
@RequestMapping("/api/popularity")
public class PopularityController {

    @Autowired
    private PopularityService popularityService;

    @GetMapping
    public List<NomineeDTO> getPopularity()
        return popularityService.getPopularity() {
            return popularityService.getAllPopularity();

        }
    @GetMapping("/{id}")
    public NomineeDTO getNomineePopularity(@PathVariable Long id) {
        return popularityService.getNomineePopularity(id);
    }
}