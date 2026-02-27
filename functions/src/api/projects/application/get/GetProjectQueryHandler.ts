import { QueryHandler } from "../../../shared/application/QueryHandler";
import { GetProjectQuery } from "./GetProjectQuery";
import { GetProjectResult } from "./GetProjectResult";
import type { ProjectRepository } from "../../domain/repositories/ProjectRepository";

export class GetProjectQueryHandler implements QueryHandler<GetProjectQuery, GetProjectResult> {
    constructor(private readonly repository: ProjectRepository) {
    }

    async handle(query: GetProjectQuery): Promise<GetProjectResult | null> {
        const project = await this.repository.findById(query.id);

        if (!project) {
            return null;
        }

        return new GetProjectResult(
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
}
