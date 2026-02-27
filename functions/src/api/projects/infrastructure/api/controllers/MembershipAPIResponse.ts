import { MembershipRole, MembershipStatus } from "../../../domain/ProjectMembership";

export class MembershipAPIResponse {
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
}
