import { MongoClient } from "mongodb";
import { AccountsManager } from "./AccountsManager";

export class DatabaseManager{
    private _mongoClient:MongoClient;
    private _accounts:AccountsManager;

    constructor(mongoClient:MongoClient){
        this._mongoClient = mongoClient;

        this._accounts = new AccountsManager(this._mongoClient.db());
    }

    public get accounts():AccountsManager{
        return this._accounts;
    }

    public get mongoClient():MongoClient{
        return this._mongoClient;
    }
}