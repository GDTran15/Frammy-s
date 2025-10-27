package com.backend.frammy.controller;

import com.backend.frammy.dto.AddNomineeRequestDTO;
import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.dto.ResponseGetAllNomineeDTO;
import com.backend.frammy.service.NomineeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("category/{categoryId}")
    public ResponseEntity<ApiResponse<PagedModel<ResponseGetAllNomineeDTO>>> getAllNominee(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "9") int size,
            @RequestParam(value = "search", defaultValue = "") String search,
            @PathVariable Long categoryId
    )  {
        Pageable pageable = PageRequest.of(page, size);
        Page<ResponseGetAllNomineeDTO> pagedModel = nomineeService.getNominees(pageable,categoryId,search);
        return ResponseEntity.ok(ApiResponse.success(new PagedModel<>(pagedModel)));
    }

    @DeleteMapping("/{nomineeId}")
    public ResponseEntity<ApiResponse<String>> deleteNominee(@PathVariable Long nomineeId){
        nomineeService.deleteNominee(nomineeId);
        return ResponseEntity.ok(ApiResponse.success("Delete success"));
    }

    @PutMapping("{nomineeId}")
    public ResponseEntity<ApiResponse<String>> updateNominee(@RequestBody @Valid AddNomineeRequestDTO addNomineeRequestDTO, @PathVariable Long nomineeId){
        nomineeService.updateNominee(addNomineeRequestDTO, nomineeId);
        return ResponseEntity.ok(ApiResponse.success("Update success"));
    }




}
