import * as net from "net";
import { GameClient } from "./GameClient";

export class GameManager{
    private _accounts:Map<string, GameClient>;
    private _clients:Map<string, GameClient>;

    constructor(){
        this._accounts = new Map();
        this._clients = new Map();
    }

    public initClient(socket:net.Socket):void{
        let client:GameClient = new GameClient(socket);
        let id:string = client.id;

        this._clients.set(id, client);

        socket.on("close", () => this.killClient(client, id));
    }

    private killClient(client:GameClient, id:string):void{
        this._clients.delete(id);
        this._accounts.delete(id);

        if(client.map){
            client.map.removeClient(client);
        }
    }
}