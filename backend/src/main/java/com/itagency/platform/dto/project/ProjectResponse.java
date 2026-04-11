package com.itagency.platform.dto.project;

import com.itagency.platform.entity.ProjectStatus;
import com.itagency.platform.entity.ProjectVisibility;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record ProjectResponse(
        UUID id,
        UUID clientId,
        String title,
        String slug,
        String shortDescription,
        String description,
        List<String> techStack,
        String coverImageUrl,
        String liveUrl,
        ProjectVisibility visibility,
        ProjectStatus status,
        BigDecimal budget,
        LocalDate kickoffDate,
        LocalDate deliveryDate,
        Integer displayOrder,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
}
