export class ProjectMembershipEntity {
    constructor(
        public id: string,
        public projectId: string,
        public userId: string,
        public role: string,
        public status: string = "PENDING",
        public message: string | null = null,
        public joinedAt: Date = new Date()
    ) {
    }

    static fromFirestore(snapshot: FirebaseFirestore.DocumentSnapshot): ProjectMembershipEntity {
        const data = snapshot.data();
        if (!data) {
            throw new Error(`Document with ID ${snapshot.id} has no data`);
        }

        return new ProjectMembershipEntity(
            snapshot.id || "",
            data.projectId,
            data.userId,
            data.role,
            data.status ?? "PENDING",
            data.message ?? null,
            data.joinedAt?.toDate() ?? new Date()
        );
    }

    toFirestore(): Record<string, unknown> {
        return {
            projectId: this.projectId,
            userId: this.userId,
            role: this.role,
            status: this.status,
            message: this.message ?? null,
            joinedAt: this.joinedAt,
        };
    }
}
