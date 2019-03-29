import { EventEmitter } from "events";
import { IDGenerator } from "../utils/IDGenerator";

export interface UnitState{
    id:string;
    anim:string;
    x:number;
    y:number;
}

export interface UnitStateUpdate{
    anim?:string;
    x?:number;
    y?:number;
}

export interface UnitParams{
    name:string;
    type:string;
    anim?:string;
    x?:number;
    y?:number;
}

export abstract class Unit extends EventEmitter implements UnitState{
    private static idGen:IDGenerator = new IDGenerator(12);

    private _id:string;
    private _ownerId:string;
    private _name:string;
    private _type:string;
    private _anim:string;
    private _x:number;
    private _y:number;
    
    constructor(params:UnitParams, ownerId:string=null){
        super();

        let { name, type, anim=null, x=0, y=0 } = params;

        this._id =      Unit.idGen.nextId();
        this._ownerId = ownerId;
        this._name =    name;
        this._type =    type;
        this._anim =    anim;
        this._x =       x;
        this._y =       y;
    }

    public setState(update:UnitStateUpdate):void{
        let { x, y, anim } = update;

        if(typeof x !== "undefined") this._x = x;
        if(typeof y !== "undefined") this._y = y;
        if(typeof anim !== "undefined") this._anim = anim;

        this.emit("update", {x, y, anim});
    }

    public getState():UnitState{
        return {
            id:     this.id,
            anim:   this.anim,
            x:      this.x,
            y:      this.y
        };
    }

    public set x(x:number){
        this._x = x; 
        this.emit("update", {x});
    }

    public set y(y:number){
        this._y = y;
        this.emit("update", {y});
    }

    public set anim(anim:string){
        this._anim = anim;
        this.emit("update", {anim});
    }

    public get id():string{
        return this._id;
    }

    public get ownerId():string{
        return this._ownerId;
    }

    public get name():string{
        return this._name;
    }

    public get type():string{
        return this._type;
    }

    public get anim():string{
        return this._anim;
    }

    public get x():number{
        return this._x;
    }

    public get y():number{
        return this._y;
    }
}