package com.backend.frammy.service;

import com.backend.frammy.dto.DeleteUserRequestDTO;
import com.backend.frammy.dto.LoginRequestDTO;
import com.backend.frammy.dto.LoginResponseDTO;
import com.backend.frammy.model.Role;
import  com.backend.frammy.model.User;
import com.backend.frammy.dto.RegisterRequestDTO;
import com.backend.frammy.exception.UserAlreadyExistException;
import com.backend.frammy.repo.UserRepo;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Transactional
    public void createAccountForUser(RegisterRequestDTO registerRequestDTO) {
            boolean userExist = userRepo.existsByUsername(registerRequestDTO.username());
            boolean gmailExist = userRepo.existsByGmail(registerRequestDTO.gmail());
            if (userExist || gmailExist){
                throw new UserAlreadyExistException("Username or gmail already exist");
            }
            User user = User.builder()
                    .username(registerRequestDTO.username())
                    .gmail(registerRequestDTO.gmail())
                    .password(bCryptPasswordEncoder.encode(registerRequestDTO.password()))
                    .role(Role.ROLE_USER)
                    .build();
            userRepo.save(user);
    }

    public LoginResponseDTO loginUser(LoginRequestDTO loginRequestDTO) {
        Authentication authentication = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(loginRequestDTO.username(),loginRequestDTO.password()));
        if (authentication.isAuthenticated()){
            User user = userRepo.findByUsername(loginRequestDTO.username());
            String token = jwtService.generateToken(user,user.getUserId());
            return new LoginResponseDTO(token,user.getRole());
        }
        return null;
    }

    @Transactional
    public void deleteUser(DeleteUserRequestDTO deleteUserRequestDTO ) {
        String username = deleteUserRequestDTO.username();
        User user = userRepo.findByUsername(username);
        if  (user == null){
            throw new UsernameNotFoundException("Username not found");
        }
        userRepo.delete(user);
    }

}
