package com.backend.frammy.controller;

import com.backend.frammy.dto.AddNomineeRequestDTO;
import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.service.NomineeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("nominee")
public class NomineeController {

    private final NomineeService nomineeService;

    @PostMapping()
    public ResponseEntity<ApiResponse<String>> addNominee(@RequestBody @Valid AddNomineeRequestDTO addNomineeRequestDTO){
        nomineeService.createNewNominee(addNomineeRequestDTO);
        return ResponseEntity.ok(ApiResponse.success("Add success"));
    }



}
