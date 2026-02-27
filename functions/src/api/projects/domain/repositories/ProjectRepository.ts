import { Project } from "../Project";

export interface ProjectRepository {
    findAll(): Promise<Project[]>;

    findById(id: string): Promise<Project | null>;

    findByOwner(ownerId: string): Promise<Project[]>;

    save(project: Project): Promise<Project>;

    delete(id: string): Promise<void>;
}
