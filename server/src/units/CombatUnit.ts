import { UnitParams, Unit } from "./Unit";

export interface CombatStat{
    current:number;
    capacity:number;
}

export interface CombatUnitParams extends UnitParams{
    health:number;
    mana:number;
    resistance:number;
}

export abstract class CombatUnit extends Unit{
    private _health:CombatStat;
    private _mana:CombatStat;
    private _resistance:CombatStat;
    
    constructor(params:CombatUnitParams){
        super(params);

        let { health, mana, resistance } = params;

        this._health = {
            current:    health,
            capacity:   health
        };

        this._mana = {
            current:    mana,
            capacity:   mana
        };

        this._resistance = {
            current:    resistance,
            capacity:   resistance
        };
    }

    public takeDamage(damage:number):boolean{
        let actualDamage:number = damage * (1 - this.resistance);

        this._health.current -= actualDamage;

        this.emit("hurt", {damage, actualDamage});

        if(this.health <= 0){
            this.emit("death");
            return true;
        }
        return false;
    }

    public get health():number{
        return this._health.current;
    }

    public get healthCap():number{
        return this._health.capacity
    }

    public get mana():number{
        return this._mana.current;
    }

    public get manaCap():number{
        return this._mana.capacity;
    }

    public get resistance():number{
        return this._resistance.current;
    }

    public get resistanceCap():number{
        return this._resistance.capacity;
    }

}