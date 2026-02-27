export class ProjectEntity {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public image: string,
        public owner: string,
        public category: string | null = null,
        public location: string | null = null,
        public volunteersNeeded: number = 0,
        public volunteerRequirements: string | null = null,
        public status: string = "OPEN",
        public tags: string[] | null = null,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
    }

    static fromFirestore(snapshot: FirebaseFirestore.DocumentSnapshot): ProjectEntity {
        const data = snapshot.data();
        if (!data) {
            throw new Error(`Document with ID ${snapshot.id} has no data`);
        }

        return new ProjectEntity(
            snapshot.id || "",
            data.title,
            data.description,
            data.image,
            data.owner,
            data.category ?? null,
            data.location ?? null,
            data.volunteersNeeded ?? 0,
            data.volunteerRequirements ?? null,
            data.status ?? "OPEN",
            data.tags ?? null,
            data.createdAt?.toDate() ?? new Date(),
            data.updatedAt?.toDate() ?? new Date()
        );
    }

    toFirestore(): Record<string, unknown> {
        return {
            title: this.title,
            description: this.description,
            image: this.image,
            owner: this.owner,
            category: this.category ?? null,
            location: this.location ?? null,
            volunteersNeeded: this.volunteersNeeded,
            volunteerRequirements: this.volunteerRequirements ?? null,
            status: this.status,
            tags: this.tags ?? null,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
