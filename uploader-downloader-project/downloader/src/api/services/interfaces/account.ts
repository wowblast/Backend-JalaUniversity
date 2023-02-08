import { Account } from '../entities/account';
export interface AccountRepository {
    InsertAccount(account: Account): Promise<void>;
    DeleteAccount(email: string): Promise<void>;
    GetAccount(email: string): Promise<Account>;
    UpdateAccount(account: Account): Promise<void>;
}