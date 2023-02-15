import { AccountRepositoryImplementation } from '../../infraestructure/postresql/accountRepositoryImplementation';
import { Account } from '../entities/account';
export class AccountService {

    private accountRepository: AccountRepositoryImplementation

    constructor() {
        this.accountRepository = new AccountRepositoryImplementation()
    }

    async insertAccountIfNewAccount(newAccount: Account) {
        const accountFound = await this.accountRepository.getAccount(newAccount.email)
        if(!accountFound)
          await this.accountRepository.insertAccount(newAccount)
    }

    async deleteAccount(email: string) {
        await this.accountRepository.deleteAccount(email)
    }

    async getAccount(email: string) {
        return await this.accountRepository.getAccount(email)
    }

    async updateAccount(account: Account) {
        await this.accountRepository.updateAccount(account)
    }

    async getAllAccounts() {
        return await this.accountRepository.getAccounts();
    }
}