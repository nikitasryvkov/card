package com.itagency.platform.repository;

import com.itagency.platform.entity.Project;
import com.itagency.platform.entity.ProjectVisibility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {

    List<Project> findByVisibilityOrderByDisplayOrderAscCreatedAtDesc(ProjectVisibility visibility);

    Optional<Project> findByIdAndVisibility(UUID id, ProjectVisibility visibility);
}
