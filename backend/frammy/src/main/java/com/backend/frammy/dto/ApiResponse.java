package com.backend.frammy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class ApiResponse <T>{
    private String status;
    private T data;
    private String message;

    public static <T> ApiResponse<T> error(String message){
        ApiResponse<T> apiResponse = new ApiResponse<T>();
        apiResponse.data = null;
        apiResponse.message = message;
        apiResponse.status = "error";
        return apiResponse;
    }

    public static <T> ApiResponse<T> success(T object){
        ApiResponse<T> apiResponse = new ApiResponse<>();
        apiResponse.data = object;
        apiResponse.status = "success";
        apiResponse.message = null;
        return apiResponse;
    }
}
