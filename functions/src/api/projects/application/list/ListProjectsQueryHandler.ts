import { QueryHandler } from "../../../shared/application/QueryHandler";
import { ListProjectsQuery } from "./ListProjectsQuery";
import { ListProjectsResult, ProjectResult } from "./ListProjectsResult";
import type { ProjectRepository } from "../../domain/repositories/ProjectRepository";
import { CacheService } from "../../../shared/application/CacheService";
import { PROJECTS_LIST_CACHE_KEY } from "../../config/CacheKeys";

export class ListProjectsQueryHandler implements QueryHandler<ListProjectsQuery, ListProjectsResult> {

    constructor(
        private readonly repository: ProjectRepository,
        private readonly cacheService: CacheService
    ) {
    }

    async handle(): Promise<ListProjectsResult> {
        const cachedResult = this.cacheService.get<ListProjectsResult>(PROJECTS_LIST_CACHE_KEY);
        if (cachedResult) {
            return cachedResult;
        }

        const projects = await this.repository.findAll();
        const projectResults = projects.map((project) => {
            return new ProjectResult(
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
        });

        const result = new ListProjectsResult(projectResults);

        this.cacheService.set(PROJECTS_LIST_CACHE_KEY, result);

        return result;
    }
}
