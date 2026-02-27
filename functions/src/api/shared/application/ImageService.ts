export interface ImageService {
    process(data: string, name: string): Promise<string>;
    processFile?(data: string, name: string): Promise<string>;
}