package com.backend.frammy.service;

import com.backend.frammy.dto.VoteRequestDTO;
import com.backend.frammy.model.Nominee;
import com.backend.frammy.model.User;
import com.backend.frammy.model.Vote;
import com.backend.frammy.repo.NomineeRepo;
import com.backend.frammy.repo.UserRepo;
import com.backend.frammy.repo.VoteRepo;
import com.backend.frammy.service.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VoteServiceTest {

    @InjectMocks private VoteService voteService;

    @Mock private VoteRepo voteRepo;
    @Mock private NomineeRepo nomineeRepo;
    @Mock private UserRepo userRepo;
    @Mock private JwtService jwtService;

    @Test
    void createVote_savesVoteSuccessfully() {
        String authHeader = "Bearer token-abc";

        VoteRequestDTO dto = new VoteRequestDTO(1L);

        User user = new User();
        Nominee nominee = new Nominee();

        when(jwtService.extractUserId("token-abc")).thenReturn(1L);

        when(nomineeRepo.findByNomineeId(1L)).thenReturn(nominee);
        when(voteRepo.existsByUser_UserIdAndNominee_NomineeId(1L, 1L)).thenReturn(false);

        voteService.createVote(dto, authHeader);

        verify(voteRepo, times(1)).save(any(Vote.class));
    }
}
