import { GoogleDriveRepositoryImplementation } from '../../infraestructure/postresql/googleDriveFileRepositoryImplementation';
import { AccountRepositoryImplementation } from '../../infraestructure/postresql/accountRepositoryImplementation';
import { GoogleDriveFile } from '../entities/googleDriveFile';
import { Account } from '../entities/account';
export class GoogleDriveFileService {

    async getFileByFileName(fileName:string) {
        const googleDriveRepositoryImplementation: GoogleDriveRepositoryImplementation = new GoogleDriveRepositoryImplementation();
        const accountRepositoryImplementation: AccountRepositoryImplementation = new AccountRepositoryImplementation()
        const leastUsedAccount: Account = await accountRepositoryImplementation.getLeastUsedAccount();
        const file: GoogleDriveFile = await googleDriveRepositoryImplementation.getFileByEmailAndFileName(leastUsedAccount.email, fileName);
        await this.updateAccountUsage(leastUsedAccount, file)
        console.log("file from ",file)
        return { webViewLink: file?.webViewLink , directDownloadLink: file?.directDownloadLink }
    }

    async getAllFiles() {
        const googleDriveRepositoryImplementation: GoogleDriveRepositoryImplementation = new GoogleDriveRepositoryImplementation();
        const files = await googleDriveRepositoryImplementation.getFiles()
        const fileNames = [...new Set(files.map(item => item.fileName))];
        return fileNames
    }

    async updateAccountUsage(leastUsedAccount: Account, file:GoogleDriveFile) {
        leastUsedAccount.downloadedData += file.fileSize;
        const accountRepositoryImplementation: AccountRepositoryImplementation = new AccountRepositoryImplementation()
        await accountRepositoryImplementation.updateAccount(leastUsedAccount);
    }
}