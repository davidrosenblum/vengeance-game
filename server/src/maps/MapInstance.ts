import { GameClient } from "../game/GameClient";
import { Unit } from "../units/Unit";

export class MapInstance{
    private _clients:Map<string, GameClient>;
    private _units:Map<string, Unit>;

    constructor(){
        this._clients = new Map();
        this._units = new Map();
    }

    public addClient(client:GameClient):boolean{
        if(!this.hasClient(client)){
            this._clients.set(client.id, client);

            return true;
        }
        return false;
    }

    public removeClient(client:GameClient):boolean{
        if(this._clients.delete(client.id)){
            return true;
        }
        return false;
    }

    public hasClient(client:GameClient):boolean{
        return this._clients.has(client.id);
    }

    public get isEmpty():boolean{
        return this._clients.size === 0;
    }
}