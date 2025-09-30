package com.backend.frammy.exception;

public class ObjectAlreadyExist extends RuntimeException {
    public ObjectAlreadyExist(String message) {
        super(message);
    }
}
