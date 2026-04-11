package com.itagency.platform.mapper;

import com.itagency.platform.dto.project.ProjectCreateRequest;
import com.itagency.platform.dto.project.ProjectResponse;
import com.itagency.platform.dto.project.ProjectUpdateRequest;
import com.itagency.platform.entity.Project;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "client", ignore = true)
    @Mapping(target = "slug", expression = "java(slugify(request.title()))")
    @Mapping(target = "techStack", expression = "java(toCsv(request.techStack()))")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Project toEntity(ProjectCreateRequest request);

    @Mapping(target = "clientId", expression = "java(project.getClient() != null ? project.getClient().getId() : null)")
    @Mapping(target = "techStack", expression = "java(toList(project.getTechStack()))")
    ProjectResponse toResponse(Project project);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "client", ignore = true)
    @Mapping(target = "slug", expression = "java(request.title() != null ? slugify(request.title()) : project.getSlug())")
    @Mapping(target = "techStack", expression = "java(request.techStack() != null ? toCsv(request.techStack()) : project.getTechStack())")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntity(ProjectUpdateRequest request, @MappingTarget Project project);

    default String toCsv(List<String> techStack) {
        if (techStack == null || techStack.isEmpty()) {
            return "";
        }
        return techStack.stream()
                .map(String::trim)
                .filter(value -> !value.isBlank())
                .collect(Collectors.joining(","));
    }

    default List<String> toList(String techStack) {
        if (techStack == null || techStack.isBlank()) {
            return Collections.emptyList();
        }
        return Arrays.stream(techStack.split(","))
                .map(String::trim)
                .filter(value -> !value.isBlank())
                .toList();
    }

    default String slugify(String value) {
        String normalized = Normalizer.normalize(value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
        return normalized.isBlank() ? "project" : normalized;
    }
}
