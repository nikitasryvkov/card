package com.itagency.platform.controller;

import com.itagency.platform.dto.project.ProjectCreateRequest;
import com.itagency.platform.dto.project.ProjectResponse;
import com.itagency.platform.dto.project.ProjectUpdateRequest;
import com.itagency.platform.service.PortfolioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/portfolio/projects")
@RequiredArgsConstructor
@Tag(name = "Portfolio", description = "Public and admin portfolio management endpoints")
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping
    @Operation(summary = "List public portfolio projects")
    public List<ProjectResponse> getPublishedProjects() {
        return portfolioService.getPublishedProjects();
    }

    @GetMapping("/{projectId}")
    @Operation(summary = "Get a single public portfolio project")
    public ProjectResponse getPublishedProject(@PathVariable UUID projectId) {
        return portfolioService.getPublishedProject(projectId);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a portfolio project", description = "Admin-only content management endpoint")
    public ProjectResponse createProject(@Valid @RequestBody ProjectCreateRequest request) {
        return portfolioService.createProject(request);
    }

    @PutMapping("/{projectId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a portfolio project", description = "Admin-only content management endpoint")
    public ProjectResponse updateProject(@PathVariable UUID projectId, @Valid @RequestBody ProjectUpdateRequest request) {
        return portfolioService.updateProject(projectId, request);
    }

    @DeleteMapping("/{projectId}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete a portfolio project", description = "Admin-only content management endpoint")
    public void deleteProject(@PathVariable UUID projectId) {
        portfolioService.deleteProject(projectId);
    }
}
