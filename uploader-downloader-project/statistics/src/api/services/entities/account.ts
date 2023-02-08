import { ObjectID } from "typeorm"

export class Account {
    id: ObjectID
    name: string
    email: string
    googleApiKey: string
    apiKey: string
}