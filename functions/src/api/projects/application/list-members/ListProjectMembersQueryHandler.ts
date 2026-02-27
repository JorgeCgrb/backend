import { QueryHandler } from "../../../shared/application/QueryHandler";
import { ListProjectMembersQuery } from "./ListProjectMembersQuery";
import { ListProjectMembersResult, MemberResult } from "./ListProjectMembersResult";
import type { ProjectMembershipRepository } from "../../domain/repositories/ProjectMembershipRepository";

export class ListProjectMembersQueryHandler implements QueryHandler<ListProjectMembersQuery, ListProjectMembersResult> {
    constructor(
        private readonly membershipRepository: ProjectMembershipRepository
    ) {
    }

    async handle(query: ListProjectMembersQuery): Promise<ListProjectMembersResult> {
        const memberships = await this.membershipRepository.findByProjectId(query.projectId);

        const memberResults = memberships.map((membership) => {
            return new MemberResult(
                membership.id,
                membership.projectId,
                membership.userId,
                membership.role,
                membership.status,
                membership.message,
                membership.joinedAt
            );
        });

        return new ListProjectMembersResult(memberResults);
    }
}
