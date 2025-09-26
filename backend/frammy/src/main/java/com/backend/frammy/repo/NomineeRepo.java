package com.backend.frammy.repo;

import com.backend.frammy.model.Nominee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NomineeRepo extends JpaRepository<Nominee,Long> {
}
