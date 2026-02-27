import { DeleteProjectCommand } from "./DeleteProjectCommand";
import type { CommandHandler } from "../../../shared/application/CommandHandler";
import type { ProjectRepository } from "../../domain/repositories/ProjectRepository";
import type { ProjectMembershipRepository } from "../../domain/repositories/ProjectMembershipRepository";
import { CacheService } from "../../../shared/application/CacheService";
import { PROJECTS_LIST_CACHE_KEY } from "../../config/CacheKeys";

export class DeleteProjectCommandHandler implements CommandHandler<DeleteProjectCommand, void> {
    constructor(
        private readonly repository: ProjectRepository,
        private readonly membershipRepository: ProjectMembershipRepository,
        private readonly cacheService: CacheService
    ) {
    }

    async handle(command: DeleteProjectCommand): Promise<void> {
        const project = await this.repository.findById(command.id);

        if (!project) {
            throw new Error(`Project with ID ${command.id} not found`);
        }

        // Eliminar todas las membresías del proyecto
        const memberships = await this.membershipRepository.findByProjectId(command.id);
        for (const membership of memberships) {
            await this.membershipRepository.delete(membership.id);
        }

        // Eliminar el proyecto
        await this.repository.delete(command.id);

        this.cacheService.invalidate(PROJECTS_LIST_CACHE_KEY);
    }
}
