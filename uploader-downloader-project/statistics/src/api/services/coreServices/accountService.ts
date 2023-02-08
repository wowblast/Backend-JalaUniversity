import { accountRepositoryImplementation } from '../../mongodb/accountRepositoryImplementation';
import { Account } from '../entities/account';
export class accountService {

    private accountRepository: accountRepositoryImplementation

    constructor() {
        this.accountRepository = new accountRepositoryImplementation()
    }

    async InsertAccount() {
        const account = new Account()
        account.apiKey = "apikey"
        account.email = "emain"
        account.googleApiKey = "google"
        account.name = "email 1"
        await this.accountRepository.InsertAccount(account)

    }

    async DeleteAccount(email: string) {
        
        await this.accountRepository.DeleteAccount(email)

    }
}