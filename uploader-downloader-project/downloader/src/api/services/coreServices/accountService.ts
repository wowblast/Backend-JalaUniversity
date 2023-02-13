import { AccountRepositoryImplementation } from '../../infraestructure/postresql/accountRepositoryImplementation';
import { Account } from '../entities/account';
export class AccountService {

    private accountRepository: AccountRepositoryImplementation

    constructor() {
        this.accountRepository = new AccountRepositoryImplementation()
    }

    async InsertAccount(newAccount: Account) {
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