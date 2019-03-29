import { MapInstance } from "./MapInstance";

export class MapInstanceFactory{
    public static create(type:string):MapInstance{
        switch(type){
            default:
                return null;
        }
    }
}