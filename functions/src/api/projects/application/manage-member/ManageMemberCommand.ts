import { MembershipStatus } from "../../domain/ProjectMembership";

export class ManageMemberCommand {
    constructor(
        public readonly membershipId: string,
        public readonly action: MembershipStatus
    ) { }
}
