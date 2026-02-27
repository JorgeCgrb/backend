import { ProjectMembership } from "../ProjectMembership";

export interface ProjectMembershipRepository {
    findById(id: string): Promise<ProjectMembership | null>;

    findByProjectId(projectId: string): Promise<ProjectMembership[]>;

    findByUserId(userId: string): Promise<ProjectMembership[]>;

    findByProjectAndUser(projectId: string, userId: string): Promise<ProjectMembership | null>;

    save(membership: ProjectMembership): Promise<ProjectMembership>;

    delete(id: string): Promise<void>;
}
