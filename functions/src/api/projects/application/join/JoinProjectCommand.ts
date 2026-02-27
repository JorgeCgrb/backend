export class JoinProjectCommand {
    constructor(
        public readonly projectId: string,
        public readonly userId: string,
        public readonly message: string | null = null
    ) { }
}
