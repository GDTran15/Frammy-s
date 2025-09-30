package com.backend.frammy.service;

import com.backend.frammy.dto.*;
import  com.backend.frammy.model.Vote;
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

}
