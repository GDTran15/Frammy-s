package com.backend.frammy.service;

import com.backend.frammy.dto.*;
import com.backend.frammy.exception.InvalidInputException;
import com.backend.frammy.exception.ObjectAlreadyExist;
import com.backend.frammy.model.Nominee;
import com.backend.frammy.model.Vote;
import com.backend.frammy.exception.UserAlreadyExistException;
import com.backend.frammy.repo.VoteRepo;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VoteService {

    private final VoteRepo voteRepo;
    private final JwtService jwtService;

    @Transactional
    public void createVote(VoteRequestDTO addVoteRequestDTO, String authHeader){

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new InvalidInputException();
        }

        String token = authHeader.substring(7);

        Long tokenUserId = jwtService.extractUserId(token);
        if (tokenUserId == null) {
            throw new InvalidInputException();
        }

        if (!tokenUserId.eqals(dto.userId())) {
            throw new InvalidInputException();
        }

        Nominee nominee = nomineeRepo.findByNomineeId(dto.nomineeId());
        if (nominee == null) {
            throw new InvalidInputException();
        }

        if (voteRepo.existsByUserIdAndNomineeId(dto.userId(), addVoteRequestDTO.nomineeId())) {
            throw new ObjectAlreadyExist("You have already voted for this nominee");
        }

        Vote vote = new Vote();
        vote.setUserId(addVoteRequestDTO.userId());
        vote.setNomineeId(addVoteRequestDTO.nomineeId());
    }



    if (voteRepo.existsByUserIdAndNomineeId(dto.userId(), dto.nomineeId()))

}
