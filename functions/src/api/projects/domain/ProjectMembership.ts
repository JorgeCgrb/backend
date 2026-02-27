export type MembershipRole = "OWNER" | "VOLUNTEER";
export type MembershipStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export class ProjectMembership {
    constructor(
        public readonly id: string,
        public readonly projectId: string,
        public readonly userId: string,
        public role: MembershipRole,
        public status: MembershipStatus = "PENDING",
        public message: string | null = null,
        public joinedAt: Date = new Date()
    ) {
    }

    public accept(): void {
        this.status = "ACCEPTED";
    }

    public reject(): void {
        this.status = "REJECTED";
    }
}
