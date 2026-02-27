import { ProjectMembership, MembershipRole, MembershipStatus } from "../../../domain/ProjectMembership";
import { ProjectMembershipEntity } from "../entities/ProjectMembershipEntity";

export class ProjectMembershipMapper {

    static toEntity(membership: ProjectMembership): ProjectMembershipEntity {
        return new ProjectMembershipEntity(
            membership.id,
            membership.projectId,
            membership.userId,
            membership.role,
            membership.status,
            membership.message,
            membership.joinedAt
        );
    }

    static toDomain(entity: ProjectMembershipEntity): ProjectMembership {
        return new ProjectMembership(
            entity.id,
            entity.projectId,
            entity.userId,
            entity.role as MembershipRole,
            entity.status as MembershipStatus,
            entity.message,
            entity.joinedAt
        );
    }
}
