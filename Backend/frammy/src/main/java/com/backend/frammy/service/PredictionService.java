package com.backend.frammy.service;

import com.backend.frammy.dto.PredictionRequestDTO;
import com.backend.frammy.dto.PredictionUsageDTO;
import com.backend.frammy.model.Nominee;
import com.backend.frammy.model.Prediction;
import com.backend.frammy.model.User;
import com.backend.frammy.repo.NomineeRepo;
import com.backend.frammy.repo.PredictionRepo;
import com.backend.frammy.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private final PredictionRepo predictionRepo;
    private final UserRepo userRepo;
    private final NomineeRepo nomineeRepo;
    private final JwtService jwtService;

    private static final int MAX_PREDICTIONS_PER_DAY = 10;

    @Transactional
    public void createPrediction(PredictionRequestDTO predictionRequestDTO, String token) {
        // Extract user from token
        String username = jwtService.extractUsername(token.substring(7));
        User user = userRepo.findByUsername(username);
        
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Check daily limit
        LocalDate today = LocalDate.now();
        long predictionsToday = predictionRepo.countByUserAndPredictionPeriod(user, today);
        
        if (predictionsToday >= MAX_PREDICTIONS_PER_DAY) {
            throw new IllegalStateException("Daily prediction limit reached");
        }

        // Get nominee
        Nominee nominee = nomineeRepo.findByNomineeId(predictionRequestDTO.getNomineeId());
        if (nominee == null) {
            throw new RuntimeException("Nominee not found");
        }

        // Check if user already predicted this nominee today
        if (predictionRepo.existsByUserAndNomineeAndPredictionPeriod(user, nominee, today)) {
            throw new IllegalStateException("You have already predicted this nominee today");
        }

        // Create prediction
        Prediction prediction = Prediction.builder()
                .user(user)
                .nominee(nominee)
                .predictionDate(LocalDateTime.now())
                .predictionPeriod(today)
                .confidenceLevel(predictionRequestDTO.getConfidenceLevel())
                .build();

        predictionRepo.save(prediction);
    }

    public PredictionUsageDTO getDailyUsage(String token) {
        String username = jwtService.extractUsername(token.substring(7));
        User user = userRepo.findByUsername(username);
        
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        LocalDate today = LocalDate.now();
        long predictionsUsed = predictionRepo.countByUserAndPredictionPeriod(user, today);

        return PredictionUsageDTO.builder()
                .predictionsUsedToday((int) predictionsUsed)
                .maxPredictionsPerDay(MAX_PREDICTIONS_PER_DAY)
                .predictionsRemaining(MAX_PREDICTIONS_PER_DAY - (int) predictionsUsed)
                .build();
    }
}
