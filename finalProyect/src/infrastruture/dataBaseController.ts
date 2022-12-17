import { AppDataSource } from "./data-source";

export async function InitializateDatabaseConection() {
    await AppDataSource.initialize();
}

export async function CloseDatabaseConection() {
    await AppDataSource.destroy();
}