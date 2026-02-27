import { ProjectRepository } from "../../domain/repositories/ProjectRepository";
import { Project } from "../../domain/Project";
import * as admin from "firebase-admin";
import { ProjectMapper } from "./mappers/ProjectMapper";
import { ProjectEntity } from "./entities/ProjectEntity";

export class FirestoreProjectRepository implements ProjectRepository {
    private db = admin.firestore().collection("projects");

    async findAll(): Promise<Project[]> {
        const snapshot = await this.db.get();
        return snapshot.docs.map(doc => {
            const entity = ProjectEntity.fromFirestore(doc);
            return ProjectMapper.toDomain(entity);
        });
    }

    async findById(id: string): Promise<Project | null> {
        const snapshot = await this.db.doc(id).get();
        if (!snapshot.exists) return null;
        const entity = ProjectEntity.fromFirestore(snapshot);
        return ProjectMapper.toDomain(entity);
    }

    async findByOwner(ownerId: string): Promise<Project[]> {
        const snapshot = await this.db.where("owner", "==", ownerId).get();
        return snapshot.docs.map(doc => {
            const entity = ProjectEntity.fromFirestore(doc);
            return ProjectMapper.toDomain(entity);
        });
    }

    async save(project: Project): Promise<Project> {
        const entity = ProjectMapper.toEntity(project);

        if (entity.id && entity.id.trim() !== "") {
            await this.db.doc(entity.id).set(entity.toFirestore(), { merge: true });
            return project;
        } else {
            const ref = await this.db.add(entity.toFirestore());
            entity.id = ref.id;
            return ProjectMapper.toDomain(entity);
        }
    }

    async delete(id: string): Promise<void> {
        const doc = await this.db.doc(id).get();
        if (!doc.exists) {
            throw new Error(`Project with ID ${id} not found`);
        }

        await this.db.doc(id).delete();
    }
}
