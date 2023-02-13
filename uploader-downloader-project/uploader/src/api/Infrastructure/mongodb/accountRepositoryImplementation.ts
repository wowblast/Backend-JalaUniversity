import { AccountRepository } from "../../services/interfaces/Account";
import { MongoRepository } from "typeorm";
import { AppDataSource } from "./datasource";
import { AccountEntity } from "./entities/accountEntity";
import { Account } from "../../services/entities/account";
import "reflect-metadata";
import { AccountMapper } from '../mappers/accountMapper';

export class AccountRepositoryImplementation implements AccountRepository {
  private repository: MongoRepository<AccountEntity>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(AccountEntity);
  }
  async insertAccount(account: Account): Promise<void> {
    await AppDataSource.initialize();
    const accountDB = AccountMapper.toMongoEntity(account);    
    await AppDataSource.mongoManager.save(accountDB); 
    console.log("Post has been saved: ", accountDB);
    await AppDataSource.destroy();
  }
  async deleteAccount(email: string): Promise<void> {
    await AppDataSource.initialize();
    const deletedGame: AccountEntity = await this.repository.findOneBy({
      email,
    });
    await this.repository.delete(deletedGame);
    await AppDataSource.destroy();
  }
  async getAccount(email: string): Promise<Account> {
    await AppDataSource.initialize();
    const accountFound: AccountEntity = await this.repository.findOneBy({
      email,
    });
    await AppDataSource.destroy();
    return AccountMapper.toDomainEntity(accountFound);
  }

  async getAllAccounts(): Promise<Account[]> {
    await AppDataSource.initialize();
    const accountsFound: AccountEntity[] = await this.repository.find({});
    await AppDataSource.destroy();
    return accountsFound.map(account => AccountMapper.toDomainEntity(account));

  }
  async updateAccount(account: Account): Promise<void> {
    await AppDataSource.initialize();
    const accountDB = await this.repository.findOneBy({
      email: account.email,
    });
    accountDB.clientId = account.clientId;
    accountDB.clientSecret = account.clientSecret;
    accountDB.redirectUri = account.redirectUri;
    accountDB.refrestToken = account.refrestToken;
    await AppDataSource.mongoManager.save(accountDB);
    console.log("Post has been updated: ", accountDB);
    await AppDataSource.destroy();
  }
}
