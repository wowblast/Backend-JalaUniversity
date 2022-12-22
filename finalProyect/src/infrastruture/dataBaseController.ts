import { AppDataSource } from './data-source';

export async function InitializateDatabaseConection (): Promise<void> {
  await AppDataSource.initialize();
}

export async function CloseDatabaseConection (): Promise<void> {
  await AppDataSource.destroy();
}
