import { ProjectStatus } from "../../domain/Project";

export class ListProjectsResult {
    constructor(public readonly projects: ProjectResult[]) {
    }
}

export class ProjectResult {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly image: string,
        public readonly owner: string,
        public readonly category: string | null,
        public readonly location: string | null,
        public readonly volunteersNeeded: number,
        public readonly volunteerRequirements: string | null,
        public readonly status: ProjectStatus,
        public readonly tags: string[] | null,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {
    }
}
