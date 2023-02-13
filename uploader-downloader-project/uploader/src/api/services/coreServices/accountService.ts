import { AccountRepositoryImplementation } from '../../Infrastructure/mongodb/accountRepositoryImplementation';
import { Account } from '../entities/account';
export class AccountService {

    private accountRepository: AccountRepositoryImplementation

    constructor() {
        this.accountRepository = new AccountRepositoryImplementation()
    }

    async InsertAccount(newAccount: Account) {
        await this.accountRepository.insertAccount(newAccount);
    }

    async DeleteAccount(email: string) {
        await this.accountRepository.deleteAccount(email);
    }

    async GetAccount(email: string):Promise<Account> {
        return await this.accountRepository.getAccount(email)
    }

    async GetAllAccounts(): Promise<Account[]> {
        return await this.accountRepository.getAllAccounts()
    }

    async UpdateAccount(account: Account) {
        await this.accountRepository.updateAccount(account)
    }
}