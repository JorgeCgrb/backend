import { ProjectMembership, MembershipRole, MembershipStatus } from "../../domain/ProjectMembership";

export class JoinProjectResult {
    constructor(
        public readonly id: string,
        public readonly projectId: string,
        public readonly userId: string,
        public readonly role: MembershipRole,
        public readonly status: MembershipStatus,
        public readonly message: string | null,
        public readonly joinedAt: Date
    ) {
    }

    static fromDomain(membership: ProjectMembership): JoinProjectResult {
        return new JoinProjectResult(
            membership.id,
            membership.projectId,
            membership.userId,
            membership.role,
            membership.status,
            membership.message,
            membership.joinedAt
        );
    }
}
