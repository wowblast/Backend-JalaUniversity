import { AccountRepository } from "../../services/interfaces/Account";
import { Repository } from "typeorm"
import { AppDataSource } from "./datasource";
import { AccountEntity } from "./entities/accountEntity";
import { Account } from '../../services/entities/account';
import "reflect-metadata"; 
import { AccountMapper } from "../mappers/account";

export class AccountRepositoryImplementation implements AccountRepository {

    private repository: Repository<AccountEntity>;

    constructor () {
        this.repository = AppDataSource.getRepository(AccountEntity);
      }
    async insertAccount(account: Account): Promise<void> {
        const accountDB = AccountMapper.toMongoEntity(account)       
        await this.repository.save(accountDB)
    }
    async deleteAccount(email: string): Promise<void> {

        const deletedGame: AccountEntity = await this.repository.findOneByOrFail({
            email
          });
          await this.repository.delete(deletedGame);
    }
    async getAccount(email: string): Promise<Account> {
        const accountFound: AccountEntity = await this.repository.findOneBy({
            email
          });
          return accountFound
    }

    async getLeastUsedAccount() {
      const accounts = await this.repository.find({})
      const lestUsedAccount = accounts.sort((a, b) => a.downloadedData < b.downloadedData ? -1 : a.downloadedData > b.downloadedData ? 1 : 0)
      console.log("lest ",lestUsedAccount)
      return AccountMapper.toDomainEntity(lestUsedAccount[0]);
    }
    async updateAccount(account: Account): Promise<void> {
        const accountDB = await this.repository.findOneByOrFail({
            email: account.email
          });
        accountDB.id = account.id;
        accountDB.downloadedData = account.downloadedData;
        await this.repository.save(accountDB);
    }

    async getAccounts() {
      const accounts = await this.repository.find()
      return accounts.map(account => AccountMapper.toDomainEntity(account))
    }

}