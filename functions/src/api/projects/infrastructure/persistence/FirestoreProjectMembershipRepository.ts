import { ProjectMembershipRepository } from "../../domain/repositories/ProjectMembershipRepository";
import { ProjectMembership } from "../../domain/ProjectMembership";
import * as admin from "firebase-admin";
import { ProjectMembershipMapper } from "./mappers/ProjectMembershipMapper";
import { ProjectMembershipEntity } from "./entities/ProjectMembershipEntity";

export class FirestoreProjectMembershipRepository implements ProjectMembershipRepository {
    private db = admin.firestore().collection("project_memberships");

    async findById(id: string): Promise<ProjectMembership | null> {
        const snapshot = await this.db.doc(id).get();
        if (!snapshot.exists) return null;
        const entity = ProjectMembershipEntity.fromFirestore(snapshot);
        return ProjectMembershipMapper.toDomain(entity);
    }

    async findByProjectId(projectId: string): Promise<ProjectMembership[]> {
        const snapshot = await this.db.where("projectId", "==", projectId).get();
        return snapshot.docs.map(doc => {
            const entity = ProjectMembershipEntity.fromFirestore(doc);
            return ProjectMembershipMapper.toDomain(entity);
        });
    }

    async findByUserId(userId: string): Promise<ProjectMembership[]> {
        const snapshot = await this.db.where("userId", "==", userId).get();
        return snapshot.docs.map(doc => {
            const entity = ProjectMembershipEntity.fromFirestore(doc);
            return ProjectMembershipMapper.toDomain(entity);
        });
    }

    async findByProjectAndUser(projectId: string, userId: string): Promise<ProjectMembership | null> {
        const snapshot = await this.db
            .where("projectId", "==", projectId)
            .where("userId", "==", userId)
            .get();

        if (snapshot.empty) return null;

        const entity = ProjectMembershipEntity.fromFirestore(snapshot.docs[0]);
        return ProjectMembershipMapper.toDomain(entity);
    }

    async save(membership: ProjectMembership): Promise<ProjectMembership> {
        const entity = ProjectMembershipMapper.toEntity(membership);

        if (entity.id && entity.id.trim() !== "") {
            await this.db.doc(entity.id).set(entity.toFirestore(), { merge: true });
            return membership;
        } else {
            const ref = await this.db.add(entity.toFirestore());
            entity.id = ref.id;
            return ProjectMembershipMapper.toDomain(entity);
        }
    }

    async delete(id: string): Promise<void> {
        const doc = await this.db.doc(id).get();
        if (!doc.exists) {
            throw new Error(`Membership with ID ${id} not found`);
        }

        await this.db.doc(id).delete();
    }
}
