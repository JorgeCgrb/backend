import { ImageService } from "../../application/ImageService";
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import { Bucket } from "@google-cloud/storage";

export class FirebaseCloudStorageService implements ImageService {
    private _bucket: Bucket | null = null;
    private readonly publicURL: string;
    private readonly bucketName: string;

    constructor(publicURL: string, bucketName = "red-experimental-semillas.firebasestorage.app") {
        this.publicURL = publicURL;
        this.bucketName = bucketName;
    }

    private get bucket(): Bucket {
        if (!this._bucket) {
            this._bucket = admin.storage().bucket(this.bucketName);
        }
        return this._bucket;
    }

    async process(imageData: string, imageName: string): Promise<string> {
        try {
            // Si no hay imagen, devolver string vacío
            if (!imageData || imageData.trim() === "") {
                return "";
            }

            // Verificar si la imagen ya es una URL válida
            const urlPattern = new RegExp("^(https?:\\/\\/)?" +
                "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
                "((\\d{1,3}\\.){3}\\d{1,3}))" +
                "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
                "(\\?[;&a-z\\d%_.~+=-]*)?" +
                "(\\#[-a-z\\d_]*)?$", "i");

            if (urlPattern.test(imageData)) {
                logger.info("La imagen ya es una URL válida. No se realiza ninguna acción.");
                return imageData;
            }

            // Si la imagen no es una URL, subirla a Firebase Storage
            // Verificar si el string es una imagen base64 válida
            const base64Pattern = /^data:image\/(jpeg|png|gif|bmp|webp);base64,/;
            if (!base64Pattern.test(imageData)) {
                throw new Error("El string proporcionado no es una imagen válida en formato base64.");
            }

            // Extraer el tipo de imagen y los datos base64
            const matches = imageData.match(/^data:image\/([a-zA-Z0-9]+);base64,/);
            if (!matches || matches.length !== 2) {
                throw new Error("Formato de imagen no válido.");
            }

            const imageType = matches[1];
            const base64Data = imageData.split(",")[1];

            // Convertir base64 a buffer
            const buffer = Buffer.from(base64Data, "base64");

            // Crear un nombre de archivo único con la extensión correcta
            const fileName = `${imageName}-${Date.now()}.${imageType}`;
            const filePath = `images/${fileName}`;

            // Crear un archivo en el bucket
            const file = this.bucket.file(filePath);

            // Subir el buffer al archivo
            await file.save(buffer, {
                metadata: {
                    contentType: `image/${imageType}`
                }
            });

            // Hacer que el archivo sea públicamente accesible
            await file.makePublic();

            // Obtener la URL pública del archivo
            let publicUrl: string;
            const encodedFilePath = encodeURIComponent(filePath);
            if (this.publicURL.includes("127.0.0.1") || this.publicURL.includes("localhost")) {
                publicUrl = `${this.publicURL}/${this.bucket.name}/${encodedFilePath}`;
            } else {
                publicUrl = `${this.publicURL}${this.bucket.name}/o/${encodedFilePath}?alt=media`;
            }

            logger.info(`Imagen subida a Firebase Storage: ${publicUrl}`);
            return publicUrl;
        } catch (error) {
            logger.error("Error al procesar la imagen:", error);
            throw error;
        }
    }

    async processFile(fileData: string, fileName: string): Promise<string> {
        try {
            if (!fileData || fileData.trim() === "") return "";
            if (fileData.startsWith("http")) return fileData;

            const matches = fileData.match(/^data:([^;]+);base64,/);
            if (!matches || matches.length !== 2) {
                throw new Error("Formato de archivo no válido o no es base64.");
            }

            const mimeType = matches[1];
            const base64Data = fileData.split(",")[1];
            const buffer = Buffer.from(base64Data, "base64");
            
            const randomId = Math.floor(Math.random() * 10000000);
            const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase() || `file-${randomId}`;
            const filePath = `files/${Date.now()}-${safeName}`;

            const file = this.bucket.file(filePath);
            await file.save(buffer, {
                metadata: { contentType: mimeType }
            });
            await file.makePublic();

            let publicUrl: string;
            const encodedFilePath = encodeURIComponent(filePath);
            if (this.publicURL.includes("127.0.0.1") || this.publicURL.includes("localhost")) {
                publicUrl = `${this.publicURL}/${this.bucket.name}/${encodedFilePath}`;
            } else {
                publicUrl = `${this.publicURL}${this.bucket.name}/o/${encodedFilePath}?alt=media`;
            }

            logger.info(`Archivo subido a Firebase Storage: ${publicUrl}`);
            return publicUrl;
        } catch (error) {
            logger.error("Error al procesar archivo:", error);
            throw error;
        }
    }
}
