import { ProjectAPIResponse } from "./ProjectAPIResponse";

export class ListProjectAPIResponse {
    constructor(
        public readonly projects: ProjectAPIResponse[]
    ) {
    }
}
