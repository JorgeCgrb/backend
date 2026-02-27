export class CreateDiscussionPostCommand {
    constructor(
        public readonly projectId: string,
        public readonly userId: string,
        public readonly userName: string,
        public readonly userImage: string,
        public readonly content: string,
        public readonly attachments?: { url: string; name: string; type: "image" | "document" }[],
        public readonly replyToPostId?: string
    ) {
    }
}
