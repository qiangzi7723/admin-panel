import Vue from 'vue';
import config from '@/config/config';

const commonPrefix = (key: string): string=>{
    return config.lsKeyPrefix + key;
}

const ls = {
    set(key: string, value: any){
        const newKey = commonPrefix(key);
        window.localStorage.setItem(newKey, value);
    },

    get(key: string): any{
        const newKey = commonPrefix(key);
        let source: any = window.localStorage.getItem(newKey);
        console.log(source)
        try{
            source = JSON.parse(source);
        }catch(e){

        }finally{

        }
        return source;
    }
}

export default ls;