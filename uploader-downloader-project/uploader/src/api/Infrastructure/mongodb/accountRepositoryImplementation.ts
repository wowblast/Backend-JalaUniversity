import { AccountRepository } from "../../services/interfaces/Account";
import { MongoRepository } from "typeorm";
import { SingletonAppDataSource } from "./datasource";
import { AccountEntity } from "./entities/accountEntity";
import { Account } from "../../services/entities/account";
import "reflect-metadata";
import { AccountMapper } from '../mappers/accountMapper';

export class AccountRepositoryImplementation implements AccountRepository {
  private repository: MongoRepository<AccountEntity>;
  private dataSourse: SingletonAppDataSource
  constructor() {
    this.dataSourse = SingletonAppDataSource.getInstance();
    this.repository = this.dataSourse.getAppDataSource().getMongoRepository(AccountEntity);
  }
  async insertAccount(account: Account): Promise<void> {
    const accountDB = AccountMapper.toMongoEntity(account);    
    await this.repository.save(accountDB); 
  }
  async deleteAccount(email: string): Promise<void> {
    const deletedGame: AccountEntity = await this.repository.findOneBy({
      email,
    });
    await this.repository.delete(deletedGame);
  }
  async getAccount(email: string): Promise<Account> {
    const accountFound: AccountEntity = await this.repository.findOneBy({
      email,
    });
    return AccountMapper.toDomainEntity(accountFound);
  }

  async getAllAccounts(): Promise<Account[]> {
    const accountsFound: AccountEntity[] = await this.repository.find({});
    return accountsFound? accountsFound.map(account => AccountMapper.toDomainEntity(account)): [];

  }
  async updateAccount(account: Account): Promise<void> {
    const accountDB = await this.repository.findOneBy({
      email: account.email,
    });
    accountDB.clientId = account.clientId;
    accountDB.clientSecret = account.clientSecret;
    accountDB.redirectUri = account.redirectUri;
    accountDB.refrestToken = account.refrestToken;
    await this.repository.save(accountDB);
  }
}
