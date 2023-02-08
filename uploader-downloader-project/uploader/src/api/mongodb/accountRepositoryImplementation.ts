import { AccountRepository } from "../services/interfaces/Account";
import { MongoRepository } from "typeorm"
import { AppDataSource } from "./datasource";
import { AccountEntity } from "./entities/accountEntity";
import { Account } from '../services/entities/account';
import "reflect-metadata"; 

export class accountRepositoryImplementation implements AccountRepository {

    private repository: MongoRepository<AccountEntity>;

    constructor () {
        this.repository = AppDataSource.getMongoRepository(AccountEntity);
      }
    async InsertAccount(account: Account): Promise<void> {
        await AppDataSource.initialize()
        const accountDB = new AccountEntity()
        accountDB.name = account.name;
        accountDB.apiKey = account.apiKey;
        accountDB.email = account.email;
        accountDB.googleApiKey = account.googleApiKey;
        await AppDataSource.mongoManager.save(accountDB)  //this.repository.save(accountDB);
        console.log("Post has been saved: ", accountDB);

        await AppDataSource.destroy()
    }
    async DeleteAccount(email: string): Promise<void> {
        await AppDataSource.initialize()

        const deletedGame: AccountEntity = await this.repository.findOneByOrFail({
            email
          });
          await this.repository.delete(deletedGame);
          await AppDataSource.destroy()

    }
    async GetAccount(email: string): Promise<Account> {
        await AppDataSource.initialize()

        const accountFound: AccountEntity = await this.repository.findOneByOrFail({
            email
          });
          await AppDataSource.destroy()
          return accountFound
    }
    async UpdateAccount(account: Account): Promise<void> {
        await AppDataSource.initialize()
        const accountDB = await this.repository.findOneByOrFail({
            email: account.email
          });
        accountDB.name = account.name;
        accountDB.apiKey = account.apiKey;
        accountDB.googleApiKey = account.googleApiKey;
        await AppDataSource.mongoManager.save(accountDB);
        console.log("Post has been updated: ", accountDB);

        await AppDataSource.destroy()
    }

}