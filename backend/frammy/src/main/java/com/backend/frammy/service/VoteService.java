package com.backend.frammy.service;

import com.backend.frammy.dto.*;
import com.backend.frammy.exception.InvalidInputException;
import com.backend.frammy.exception.ObjectAlreadyExist;
import com.backend.frammy.model.Nominee;
import com.backend.frammy.model.Vote;
import com.backend.frammy.exception.UserAlreadyExistException;

import com.backend.frammy.repo.NomineeRepo;
import com.backend.frammy.repo.UserRepo;
import com.backend.frammy.repo.VoteRepo;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VoteService {

    private final VoteRepo voteRepo;
    private final UserRepo userRepo;
    private final NomineeRepo nomineeRepo;
    private final JwtService jwtService;

    @Transactional
    public void createVote(VoteRequestDTO dto, String authHeader){

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new InvalidInputException();
        }

        String token = authHeader.substring(7);
        Long tokenUserId = jwtService.extractUserId(token);
        if (tokenUserId == null) {
            throw new InvalidInputException();
        }

        Nominee nominee = nomineeRepo.findByNomineeId(dto.nomineeId());
        if (nominee == null) {
            throw new InvalidInputException();
        }

        ZoneId zone = ZoneId.of("Australia/Sydney");
        LocalDate today = LocalDate.now(zone);
        Instant startOfToday = today.atStartOfDay(zone).toInstant();
        Instant startOfTomorrow = today.plusDays(1).atStartOfDay(zone).toInstant();

        long todaysCount = voteRepo.countByUser_UserIdAndCreatedAtBetween(tokenUserId, startOfToday, startOfTomorrow);
        if (todaysCount >= 3) {
            throw new ObjectAlreadyExist("Daily limit reached: you can only cast up to 3 votes a day.");
        }

//        if (voteRepo.existsByUser_UserIdAndNominee_NomineeId(tokenUserId, dto.nomineeId())) {
//            throw new ObjectAlreadyExist("You have already voted for this nominee");
//        }

        Vote vote = new Vote();
        vote.setUser(userRepo.findByUserId(tokenUserId));
        vote.setNominee(nominee);
        voteRepo.save(vote);
    }


}
