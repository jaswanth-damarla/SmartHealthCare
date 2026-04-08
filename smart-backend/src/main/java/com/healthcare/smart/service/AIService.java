package com.healthcare.smart.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class AIService {
    public List<Map<String, String>> getMockRecommendations() {
        return List.of(
            Map.of("type", "Exercise", "suggestion", "30 min Cardio based on heart rate history"),
            Map.of("type", "Diet", "suggestion", "Increase protein intake for muscle recovery"),
            Map.of("type", "Specialist", "suggestion", "Dermatologist review recommended for skin patterns")
        );
    }
}
