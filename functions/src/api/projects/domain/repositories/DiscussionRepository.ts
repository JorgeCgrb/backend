import { DiscussionPost } from "../DiscussionPost";

export interface DiscussionRepository {
    findByProjectId(projectId: string): Promise<DiscussionPost[]>;

    save(post: DiscussionPost): Promise<DiscussionPost>;
}
