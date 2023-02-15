import { Account } from '../entities/account';
export interface AccountRepository {
    insertAccount(account: Account): Promise<void>;
    deleteAccount(email: string): Promise<void>;
    getAccount(email: string): Promise<Account>;
    updateAccount(account: Account): Promise<void>;
}