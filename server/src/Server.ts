import * as net from "net"
import * as dgram from "dgram";
import * as child_process from "child_process";
import { GameManager } from "./game/GameManager";

export class Server{
    private _server:net.Server;
    private _socket:dgram.Socket;
    private _webProc:child_process.ChildProcess;
    private _game:GameManager;

    constructor(){
        this._server = net.createServer();
        this._server.on("connection", this.handleTCPConnection);
        
        this._socket = dgram.createSocket("udp4");

        this._game = new GameManager();
    }

    private handleTCPConnection = (socket:net.Socket):void => {
        this._game.initClient(socket);
    }

    private spawnWebServer():void{
        this._webProc = child_process.spawn("node", ["./build/WebServer.js"]);
    }
}