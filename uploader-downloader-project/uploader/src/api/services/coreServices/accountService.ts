import { AccountRepositoryImplementation } from "../../Infrastructure/mongodb/accountRepositoryImplementation";
import { Account } from "../entities/account";
import { GoogleDriveFileRepositoryImplementation } from "../../Infrastructure/mongodb/googleDriveFileRepositoryImplementation";
import { GoogleDriveAction } from "../../Infrastructure/googledrive/googleDriveAction";
import { config } from "../../../../config";
import { File } from "../entities/file";
import { GoogleDriveManager } from "../../Infrastructure/googledrive/googledriveManager";
export class AccountService {
  private accountRepository: AccountRepositoryImplementation;
  private googleDriveFileRepositoryImplementation: GoogleDriveFileRepositoryImplementation;

  constructor() {
    this.accountRepository = new AccountRepositoryImplementation();
    this.googleDriveFileRepositoryImplementation =
      new GoogleDriveFileRepositoryImplementation();
  }

  async insertAccount(newAccount: Account) {
    await this.accountRepository.insertAccount(newAccount);
  }

  async deleteAccount(email: string) {
    this.deleteAllFileFromGoogleDrive(email)
  }
  async deleteAccountData(email: string) {
    await this.accountRepository.deleteAccount(email);
  }

  async getAccount(email: string): Promise<Account> {
    return await this.accountRepository.getAccount(email);
  }

  async getAllAccounts(): Promise<Account[]> {
    return await this.accountRepository.getAllAccounts();
  }

  async updateAccount(account: Account) {
    await this.accountRepository.updateAccount(account);
  }

  async deleteGoogleDriveFileByEmail(email: string) {
    await this.googleDriveFileRepositoryImplementation.deleteFileByEmail(email);
  }

  async deleteAllFileFromGoogleDrive(email: string) {
    const accountFound = await this.getAccount(email);
    if (accountFound) {
      const googleDriveAction: GoogleDriveAction = {
        method: config.googleDriveActionTypes.deleteAccount,
        file: null,
        email: email
      };
      const googleDriveManager = GoogleDriveManager.getInstance();
      googleDriveManager.manageGoogleDriveService(googleDriveAction);
    }
  }
}
