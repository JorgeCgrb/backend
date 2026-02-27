export type ProjectStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CLOSED";

export class Project {
    constructor(
        public readonly id: string,
        public title: string,
        public description: string,
        public image: string,
        public readonly owner: string,
        public category: string | null = null,
        public location: string | null = null,
        public volunteersNeeded: number = 0,
        public volunteerRequirements: string | null = null,
        public status: ProjectStatus = "OPEN",
        public tags: string[] | null = null,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
    }

    public update(data: Partial<Omit<Project, "id" | "owner" | "createdAt">>) {
        this.title = data.title ?? this.title;
        this.description = data.description ?? this.description;
        this.image = data.image ?? this.image;
        this.category = data.category ?? this.category;
        this.location = data.location ?? this.location;
        this.volunteersNeeded = data.volunteersNeeded ?? this.volunteersNeeded;
        this.volunteerRequirements = data.volunteerRequirements ?? this.volunteerRequirements;
        this.status = data.status ?? this.status;
        this.tags = data.tags ?? this.tags;
        this.updatedAt = new Date();
    }
}
