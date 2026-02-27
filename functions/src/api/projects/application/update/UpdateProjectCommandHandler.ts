import { UpdateProjectCommand } from "./UpdateProjectCommand";
import type { CommandHandler } from "../../../shared/application/CommandHandler";
import type { ProjectRepository } from "../../domain/repositories/ProjectRepository";
import { CacheService } from "../../../shared/application/CacheService";
import { ImageService } from "../../../shared/application/ImageService";
import { PROJECTS_LIST_CACHE_KEY } from "../../config/CacheKeys";
import { UpdateProjectResult } from "./UpdateProjectResult";

export class UpdateProjectCommandHandler implements CommandHandler<UpdateProjectCommand, UpdateProjectResult> {
    constructor(
        private readonly repository: ProjectRepository,
        private readonly cacheService: CacheService,
        private readonly imageService: ImageService
    ) {
    }

    async handle(command: UpdateProjectCommand): Promise<UpdateProjectResult> {
        const project = await this.repository.findById(command.id);

        if (!project) {
            throw new Error(`Project with ID ${command.id} not found`);
        }

        let processedImageUrl = project.image;
        if (command.image && command.image !== project.image) {
            processedImageUrl = await this.imageService.process(
                command.image,
                `project-${command.id}`
            );
        }

        project.update({
            title: command.title,
            description: command.description,
            image: processedImageUrl,
            category: command.category,
            location: command.location,
            volunteersNeeded: command.volunteersNeeded,
            volunteerRequirements: command.volunteerRequirements,
            status: command.status,
            tags: command.tags,
        });

        const savedProject = await this.repository.save(project);

        this.cacheService.invalidate(PROJECTS_LIST_CACHE_KEY);

        return UpdateProjectResult.fromDomain(savedProject);
    }
}
