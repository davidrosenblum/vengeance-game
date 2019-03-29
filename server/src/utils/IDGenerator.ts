export class IDGenerator{
    private static readonly values:string[] = "abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");

    private _idLength:number;
    private _usedIds:Map<string, boolean>;

    constructor(idLength:number){
        this._idLength = idLength;
        this._usedIds = new Map();
    }

    public static anyValue():string{
        let index:number = Math.floor(Math.random() * this.values.length);

        return this.values[index];
    }

    public static anyId(idLength:number):string{
        let buf:string[] = new Array(idLength);

        for(let i:number = 0; i < idLength; i++){
            buf[i] = this.anyValue();
        }

        return buf.join("");
    }

    public nextId():string{
        let id:string;

        do{
            id = IDGenerator.anyId(this.idLength);
        } while(this.hasId(id));

        this._usedIds.set(id, true);

        return id;
    }

    public releaseId(id:string):boolean{
        return this._usedIds.delete(id);
    }

    public hasId(id:string):boolean{
        return this._usedIds.has(id);
    }

    public get idLength():number{
        return this._idLength;
    }
}