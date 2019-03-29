import * as net from "net";
import { Opcode, MSG_DELIM } from "./Comm";
import { MapInstance } from "../maps/MapInstance";
import { IDGenerator } from "../utils/IDGenerator";
import { JsonUtils } from "../utils/JsonUtils";

export class GameClient{
    private static idGen:IDGenerator = new IDGenerator(8);

    private _id:string;
    private _socket:net.Socket;
    private _map:MapInstance;

    constructor(socket:net.Socket){
        this._id = GameClient.idGen.nextId();
        this._socket = socket;
        this._map = null;

        this._socket.on("close", this.handleClose);
    }

    private handleClose = (hadErr:boolean):void => {
        GameClient.idGen.releaseId(this.id);
    }

    private send(opcode:Opcode, data:any=null):void{
        JsonUtils.stringify({opcode, data}, (err, str) => {
            if(!err){
                this.sendString(str + MSG_DELIM);
            }
        });
    }

    private sendString(str:string):void{
        try{
            this._socket.write(str);
        }
        catch(err){
            return;
        }
    }

    public get id():string{
        return this._id;
    }

    public get map():MapInstance{
        return this._map;
    }
}