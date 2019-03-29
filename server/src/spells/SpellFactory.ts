import { Spell, SpellTarget } from "./Spell";

export class SpellFactory{
    public static create(spellName:string):Spell{
        switch(spellName){
            case "attack":
                return new Spell({
                    name:       "Attack Test",
                    manaCost:   1,
                    cooldown:   3,
                    targetType: SpellTarget.ENEMIES_ONLY
                });

            default:
                return null;
        }
    }
}