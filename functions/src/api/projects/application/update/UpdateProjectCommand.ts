import { ProjectStatus } from "../../domain/Project";

export class UpdateProjectCommand {
    constructor(
        public readonly id: string,
        public readonly title?: string,
        public readonly description?: string,
        public readonly image?: string,
        public readonly category?: string,
        public readonly location?: string,
        public readonly volunteersNeeded?: number,
        public readonly volunteerRequirements?: string,
        public readonly status?: ProjectStatus,
        public readonly tags?: string[]
    ) { }
}
