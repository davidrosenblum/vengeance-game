import { CombatUnit, CombatUnitParams } from "./CombatUnit";
import { Spell, SpellSummary } from "../spells/Spell";
import { SpellFactory } from "../spells/SpellFactory";

export interface SpellUnitParams extends CombatUnitParams{
    spellNames?:string[];
}

export abstract class SpellUnit extends CombatUnit{
    private _spells:Map<string, Spell>;

    constructor(params:SpellUnitParams){
        super(params);

        this._spells = new Map();

        if(params.spellNames){
            params.spellNames.forEach(sname => this.addSpell(sname));
        }
    }

    public addSpell(spellName:string):boolean{
        if(!this.hasSpell(spellName)){
            let spell:Spell = SpellFactory.create(spellName);

            if(spell){
                this._spells.set(spellName, spell);
                return true;
            }
        }
        return false;
    }

    public removeSpell(spellName:string):boolean{
        return this._spells.delete(spellName);
    }

    public hasSpell(spellName:string):boolean{
        return this._spells.has(spellName);
    }

    public getSpells():SpellSummary[]{
        let info:SpellSummary[] = [];
        
        this._spells.forEach(spell => {
            info.push(spell.getSummary());
        });

        return info;
    }
}