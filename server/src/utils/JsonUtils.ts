type ParseCallback = (error:Error, object:any) => void;
type StringifyCallback = (error:Error, string:string) => void;

export class JsonUtils{
    public static parse(str:string, callback:ParseCallback):void{
        let obj:any = null;

        try{
            obj = JSON.parse(str);
        }
        catch(err){
            callback(err, null);
            return;
        }

        callback(null, obj);
    }

    private static stringifyHelper(obj:any, pretty:boolean, callback:StringifyCallback):void{
        let str:string = null;

        try{
            str = pretty ? JSON.stringify(obj, null, 4) : JSON.stringify(obj);
        }
        catch(err){
            callback(err, null);
            return;
        }

        callback(null, str);
    }

    public static stringify(obj:any, callback:StringifyCallback):void{
        return this.stringifyHelper(obj, false, callback);
    }

    public static stringifyPretty(obj:any, callback:StringifyCallback):void{
        return this.stringifyHelper(obj, true, callback);
    }
}