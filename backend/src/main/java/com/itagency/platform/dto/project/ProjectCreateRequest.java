package com.itagency.platform.dto.project;

import com.itagency.platform.entity.ProjectStatus;
import com.itagency.platform.entity.ProjectVisibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record ProjectCreateRequest(
        @NotBlank @Size(max = 160) String title,
        @NotBlank @Size(max = 240) String shortDescription,
        @NotBlank String description,
        List<@NotBlank @Size(max = 40) String> techStack,
        @Size(max = 512) String coverImageUrl,
        @Size(max = 512) String liveUrl,
        ProjectVisibility visibility,
        ProjectStatus status,
        BigDecimal budget,
        LocalDate kickoffDate,
        LocalDate deliveryDate,
        Integer displayOrder
) {
}
