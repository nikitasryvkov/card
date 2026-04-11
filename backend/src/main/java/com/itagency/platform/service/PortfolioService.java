package com.itagency.platform.service;

import com.itagency.platform.dto.project.ProjectCreateRequest;
import com.itagency.platform.dto.project.ProjectResponse;
import com.itagency.platform.dto.project.ProjectUpdateRequest;
import com.itagency.platform.entity.Project;
import com.itagency.platform.entity.ProjectVisibility;
import com.itagency.platform.exception.ResourceNotFoundException;
import com.itagency.platform.mapper.ProjectMapper;
import com.itagency.platform.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    @Transactional(readOnly = true)
    public List<ProjectResponse> getPublishedProjects() {
        return projectRepository.findByVisibilityOrderByDisplayOrderAscCreatedAtDesc(ProjectVisibility.PUBLIC)
                .stream()
                .map(projectMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse getPublishedProject(UUID projectId) {
        Project project = projectRepository.findByIdAndVisibility(projectId, ProjectVisibility.PUBLIC)
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio project not found."));
        return projectMapper.toResponse(project);
    }

    @Transactional
    public ProjectResponse createProject(ProjectCreateRequest request) {
        Project savedProject = projectRepository.save(projectMapper.toEntity(request));
        return projectMapper.toResponse(savedProject);
    }

    @Transactional
    public ProjectResponse updateProject(UUID projectId, ProjectUpdateRequest request) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found."));
        projectMapper.updateEntity(request, project);
        Project updatedProject = projectRepository.save(project);
        return projectMapper.toResponse(updatedProject);
    }

    @Transactional
    public void deleteProject(UUID projectId) {
        if (!projectRepository.existsById(projectId)) {
            throw new ResourceNotFoundException("Project not found.");
        }
        projectRepository.deleteById(projectId);
    }
}
