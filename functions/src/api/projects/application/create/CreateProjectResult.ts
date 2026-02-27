import { Project, ProjectStatus } from "../../domain/Project";

export class CreateProjectResult {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly image: string,
        public readonly owner: string,
        public readonly category: string | null = null,
        public readonly location: string | null = null,
        public readonly volunteersNeeded: number = 0,
        public readonly volunteerRequirements: string | null = null,
        public readonly status: ProjectStatus = "OPEN",
        public readonly tags: string[] | null = null,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date()
    ) {
    }

    static fromDomain(project: Project): CreateProjectResult {
        return new CreateProjectResult(
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
