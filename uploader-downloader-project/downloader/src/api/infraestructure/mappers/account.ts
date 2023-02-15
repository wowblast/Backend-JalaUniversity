import { Account } from "../../services/entities/account";
import { AccountEntity } from "../postresql/entities/accountEntity";

export class AccountMapper {
  public static toDomainEntity(accountEntity: AccountEntity): Account {
    const account = new Account();
    account.id = accountEntity.id;
    account.email = accountEntity.email;
    account.downloadedData = accountEntity.downloadedData;
    return account;
  }

  public static toMongoEntity(account: Account): AccountEntity {
    const accountEntity = new AccountEntity();
    accountEntity.id = account.id;
    accountEntity.email = account.email;
    accountEntity.downloadedData = account.downloadedData;
    return accountEntity;
  }
}
