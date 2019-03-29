import * as crypto from "crypto";
import { Db, Collection } from "mongodb";

export interface AccountInfo{
    username:string;
    password:string;
    access_level:number;
    enabled:boolean;
    date_joined:string;
}

export class AccountsManager{
    private _db:Db;

    constructor(database:Db){
        this._db = database;
    }

    private static hash(input:string):string{
        return crypto.createHash("md5").update(input).digest("hex");
    }

    private static makeAccountObject(username:string, password:string):AccountInfo{
        let hash:string = AccountsManager.hash(password);

        return {
            username,
            password: hash,
            access_level: 1,
            enabled: true,
            date_joined: Date.now().toLocaleString()
        };
    }   

    public createAccount(username:string, password:string):Promise<string>{
        return new Promise((resolve, reject) => {
            let account:AccountInfo = AccountsManager.makeAccountObject(username, password);

            this.collection.insertOne(account, err => {
                err ? reject(err) : resolve(`Account ${username} created.`);
            });
        });
    }

    public retrieveAccount(username:string, password:string):Promise<AccountInfo>{
        return new Promise((resolve, reject) => {
            let hash:string = AccountsManager.hash(password);

            this.collection.findOne({username, password: hash});
        });
    }

    public createCollection():Promise<number>{
        return new Promise((resolve, reject) => {
            this._db.createCollection("accounts")
                .then(collection => {
                    collection.createIndex("username", {unique: true})
                        .then(() => resolve(1))
                        .catch(err => reject(err));
                })
                .catch(err => reject(err));
        });
    }

    private get collection():Collection{
        return this._db.collection("accounts");
    }
}