import { MembershipAPIResponse } from "./MembershipAPIResponse";

export class ListMembershipAPIResponse {
    constructor(
        public readonly members: MembershipAPIResponse[]
    ) {
    }
}
