import { accountRepositoryImplementation } from '../../mongodb/accountRepositoryImplementation';
import { Account } from '../entities/account';
export class AccountService {

    private accountRepository: accountRepositoryImplementation

    constructor() {
        this.accountRepository = new accountRepositoryImplementation()
    }

    async InsertAccount(newAccount: Account) {
        const account = new Account()
        account.apiKey = "apikey"
        account.email = "emain"
        account.googleApiKey = "google"
        account.name = "email 1"
        await this.accountRepository.InsertAccount(newAccount)

    }

    async DeleteAccount(email: string) {
        
        await this.accountRepository.DeleteAccount(email)

    }

    async GetAccount(email: string) {
        return await this.accountRepository.GetAccount(email)
    }

    async UpdateAccount(account: Account) {
        await this.accountRepository.UpdateAccount(account)
    }
}