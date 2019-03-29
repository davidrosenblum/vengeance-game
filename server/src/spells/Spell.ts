export interface SpellSummary{
    name:string;
    rank:number;
    targetType:SpellTarget;
    manaCost:number;
    cooldown:number;
}

export enum SpellTarget{   
    ALLIES_ONLY =   1,
    ALLIES_SELF =   2,
    SELF_ONLY =     3,
    ENEMIES_ONLY =  4
}

export interface SpellParams{
    name:string;
    rank?:number;
    targetType:SpellTarget;
    manaCost:number;
    cooldown:number;
}

export class Spell{
    private _name:string;
    private _rank:number;
    private _manaCost:number;
    private _cooldown:number;
    private _targetType:SpellTarget;
    private _ready:boolean;

    constructor(params:SpellParams){
        let { name, rank=1, manaCost, cooldown, targetType } = params;

        this._name =        name;
        this._rank =        rank;
        this._manaCost =    manaCost;
        this._cooldown =    cooldown;
        this._targetType =  targetType;
        this._ready =       true;
    }

    public getSummary():SpellSummary{
        return {
            name:       this.name,
            rank:       this.rank,
            manaCost:   this.manaCost,
            cooldown:   this.cooldown,
            targetType: this.targetType
        };
    }

    public get name():string{
        return this._name;
    }

    public get rank():number{
        return this._rank;
    }

    public get manaCost():number{
        return this._manaCost;
    }

    public get cooldown():number{
        return this._cooldown;
    }

    public get targetType():SpellTarget{
        return this._targetType;
    }

    public get isReady(){
        return this._ready;
    }
}