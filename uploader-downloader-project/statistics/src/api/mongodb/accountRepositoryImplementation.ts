import { AccountRepository } from "../services/interfaces/Account";
import { MongoRepository } from "typeorm"
import { AppDataSource } from "./datasource";
import { AccountEntity } from "./entities/accountEntity";
import { Account } from '../services/entities/account';

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
        await this.repository.save(account);
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
    GetAccount(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    UpdateAccount(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}