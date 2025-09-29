package com.backend.frammy.service;

import com.backend.frammy.dto.*;
import com.backend.frammy.model.Role;
import  com.backend.frammy.model.User;
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

import java.util.List;
import java.util.Optional;

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

            User user = userRepo.findByUsername(loginRequestDTO.username());
            String token = jwtService.generateToken(user,user.getUserId());
            return new LoginResponseDTO(token,user.getRole());

    }

    @Transactional
    public void deleteUser(DeleteUserRequestDTO deleteUserRequestDTO ) {
        Long userId = deleteUserRequestDTO.userId();
        User user = userRepo.findByUserId(userId);
        if  (user == null){
            throw new UsernameNotFoundException("User ID not found");
        }
        userRepo.delete(user);
    }

    @Transactional
    public void editUser(EditUserRequestDTO editUserRequestDTO) {
        User user =  userRepo.findById(editUserRequestDTO.userId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (userRepo.existsByUsername(editUserRequestDTO.username()) && !user.getUsername().equals(editUserRequestDTO.username())){
            throw new UserAlreadyExistException("Username already exist");
        }

        if (userRepo.existsByGmail(editUserRequestDTO.gmail()) && !user.getGmail().equals(editUserRequestDTO.gmail())){
            throw new UserAlreadyExistException("Gmail already exist");
        }

        user.setUsername(editUserRequestDTO.username());
        user.setGmail(editUserRequestDTO.gmail());
        user.setPassword(bCryptPasswordEncoder.encode(editUserRequestDTO.password()));

        userRepo.save(user);
    }

    public List<UserResponseDTO> getAllUsers() {
        List<User> users = userRepo.findAll();

        return users.stream().map(user -> new UserResponseDTO(
                user.getUserId(),
                user.getGmail(),
                user.getRole(),
                user.getUsername()
        )).toList();
    }

}
