import { AccountEntity } from '../mongodb/entities/accountEntity';
import { Account } from '../../services/entities/account';
export class AccountMapper {

    public static toDomainEntity(accountEntity: AccountEntity): Account{
        const account = new Account()
        account._id = accountEntity._id;
        account.clientId = accountEntity.clientId;
        account.clientSecret = accountEntity.clientSecret;
        account.email = accountEntity.email;
        account.redirectUri = accountEntity.redirectUri;
        account.refrestToken = accountEntity.refrestToken;       
        return account
    }

    public static toMongoEntity(account: Account): AccountEntity {
        const accountEntity = new AccountEntity()
        accountEntity._id = account._id;
        accountEntity.clientId = account.clientId;
        accountEntity.clientSecret = account.clientSecret;
        accountEntity.email = account.email;
        accountEntity.redirectUri = account.redirectUri;
        accountEntity.refrestToken = account.refrestToken; 
        return accountEntity
    }
}