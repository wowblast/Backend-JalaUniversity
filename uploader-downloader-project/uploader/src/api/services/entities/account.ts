import { ObjectID } from "typeorm"

export class Account {
    _id: string
    name: string
    email: string
    googleApiKey: string
    apiKey: string
}