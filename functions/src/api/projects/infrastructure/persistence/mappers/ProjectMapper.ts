import { Project, ProjectStatus } from "../../../domain/Project";
import { ProjectEntity } from "../entities/ProjectEntity";

export class ProjectMapper {

    static toEntity(project: Project): ProjectEntity {
        return new ProjectEntity(
            project.id,
            project.title,
            project.description,
            project.image,
            project.owner,
            project.category,
            project.location,
            project.volunteersNeeded,
            project.volunteerRequirements,
            project.status,
            project.tags,
            project.createdAt,
            project.updatedAt
        );
    }

    static toDomain(entity: ProjectEntity): Project {
        return new Project(
            entity.id,
            entity.title,
            entity.description,
            entity.image,
            entity.owner,
            entity.category,
            entity.location,
            entity.volunteersNeeded,
            entity.volunteerRequirements,
            entity.status as ProjectStatus,
            entity.tags,
            entity.createdAt,
            entity.updatedAt
        );
    }
}
