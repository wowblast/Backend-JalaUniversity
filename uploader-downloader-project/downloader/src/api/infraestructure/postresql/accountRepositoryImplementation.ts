import { AccountRepository } from "../../services/interfaces/Account";
import { Repository, Column } from "typeorm";
import { SingletonAppDataSource } from "./datasource";
import { AccountEntity } from "./entities/accountEntity";
import { Account } from "../../services/entities/account";
import { AccountMapper } from "../mappers/accountMapper";

export class AccountRepositoryImplementation implements AccountRepository {
  private repository: Repository<AccountEntity>;

  constructor() {
    this.repository = SingletonAppDataSource.getInstance()
      .getAppDataSource()
      .getRepository(AccountEntity);
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
    return accountFound;
  }

  async getLeastUsedAccounts() {
    const accounts = await this.repository.find({});
    const lestUsedAccounts = accounts.sort((a, b) =>
      a.downloadedData < b.downloadedData
        ? -1
        : a.downloadedData > b.downloadedData
        ? 1
        : 0
    );
    return lestUsedAccounts
      ? lestUsedAccounts.map((lestUsedAccount) =>
          AccountMapper.toDomainEntity(lestUsedAccount)
        )
      : [];
  }

  async getTimesDownloadedAverage(): Promise<number> {
    const results = await this.repository
      .createQueryBuilder("account_entity")
      .select("AVG(account_entity.timesDownloaded)", "timesDownloaded")
      .getRawOne();
    return results.timesDownloaded;
  }
  async updateAccount(account: Account): Promise<void> {
    const accountDB = AccountMapper.toMongoEntity(account)
    await this.repository.save(accountDB);
  }

  async getAccounts() {
    const accounts = await this.repository.find();
    return accounts.map((account) => AccountMapper.toDomainEntity(account));
  }
}
