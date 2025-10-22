package com.backend.frammy.exception;

public class VoteAlreadyExistException extends RuntimeException {
    public VoteAlreadyExistException(String message) {
        super(message);
    }
}
