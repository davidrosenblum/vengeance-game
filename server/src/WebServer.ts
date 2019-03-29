import * as express from "express";
import * as http from "http";

export class WebServer{
    private _app:express.Application;
    private _server:http.Server;

    constructor(){
        this._app = express();
        this._server = http.createServer(this._app);

        this.createRoutes();
        this.init();
    }

    private createRoutes():void{
        this._app.use(express.static(`${__dirname}/web`));

        this._app.get("/", (req, res) => res.sendFile("index.html"));
    }

    private init():void{
        let port:number = parseInt(process.env.PORT) || 8080;
        this._server.listen(port, () => {
            console.log(`HTTP server listening on port ${port}.`);
        });
    }
}

if(require.main === module){
    new WebServer();
}