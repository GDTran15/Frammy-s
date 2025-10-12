package com.backend.frammy.service;

import com.backend.frammy.repo.NomineeRepo;
import com.backend.frammy.repo.VoteRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.backend.frammy.dto.LeaderboardEntryDTO;
import com.backend.frammy.model.Nominee;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private final VoteRepo voteRepo;
    private final NomineeRepo nomineeRepo;

    private String displayNameOf(Nominee n) {
        return switch (n.getNomineeType()) {
            case ARTIST -> n.getArtist() != null ? n.getArtist().getArtistName() : "Unknown Artist";
            case ALBUM  -> n.getAlbum()  != null ? n.getAlbum().getAlbumName() : "Unknown Album";
            case SONG   -> n.getSong()   != null ? n.getSong().getSongName()  : "Unknown Song";
        };
    }

    public List<LeaderboardEntryDTO> getTop(Integer limit, Long categoryId) {
        int top = (limit == null || limit < 1) ? 25 : limit;

        var rows = (categoryId == null)
                ? voteRepo.aggregateCounts(PageRequest.of(0, top))
                : voteRepo.aggregateCountsByCategory(categoryId, PageRequest.of(0, top));

        var ids = rows.stream().map(VoteRepo.VoteCount::getNomineeId).toList();
        Map<Long, Nominee> nominees = nomineeRepo.findAllById(ids).stream()
                .collect(Collectors.toMap(Nominee::getNomineeId, n -> n));

        var out = new ArrayList<LeaderboardEntryDTO>(rows.size());
        int rank = 1;
        for (var r : rows) {
            var n = nominees.get(r.getNomineeId());
            if (n == null) continue; // defensive
            out.add(new LeaderboardEntryDTO(
                    n.getNomineeId(),
                    n.getNomineeType(),
                    displayNameOf(n),
                    r.getVotes(),
                    rank++
            ));
        }
        return out;
    }
}

