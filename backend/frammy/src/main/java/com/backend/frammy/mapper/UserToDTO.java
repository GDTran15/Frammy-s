package com.backend.frammy.mapper;

import com.backend.frammy.dto.UserResponseDTO;
import com.backend.frammy.model.User;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class UserToDTO implements Function<User, UserResponseDTO> {
    @Override
    public UserResponseDTO apply(User user) {
        return  new UserResponseDTO(
                user.getUserId(),
                user.getGmail(),
                user.getRole(),
                user.getUsername()
        );
    }
}
