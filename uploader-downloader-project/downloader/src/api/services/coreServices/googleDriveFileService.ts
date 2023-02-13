import { GoogleDriveRepositoryImplementation } from '../../infraestructure/postresql/googleDriveFileRepositoryImplementation';
export class GoogleDriveFileService {

    async getFileByFileName(fileName:string) {
        const googleDriveRepositoryImplementation: GoogleDriveRepositoryImplementation = new GoogleDriveRepositoryImplementation()
        const files = await googleDriveRepositoryImplementation.getFile(fileName)
        return files
    }

    

}