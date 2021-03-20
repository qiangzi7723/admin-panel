import axios, {
    AxiosRequestConfig
} from 'axios';
import Vue from 'vue'
import ls from '@/adapter/ls'
import router from '../router'

axios.defaults.baseURL = 'http://activity.via.cool:3014';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;
axios.defaults.responseType = 'json';

axios.defaults.transformRequest = [(data, headers) =>{
    // 设置公共请求头
    headers.get['Authorization'] = 'Bear ' + ls.get('jwt'); 
    headers.post['Authorization'] = 'Bear ' + ls.get('jwt'); 
    console.log(data);
    // 最终必须返回一个字符串
    if(data instanceof FormData){
        return data;
    }else{
        return JSON.stringify(data);
    }
}]

type axiosParams = [string, any ? , AxiosRequestConfig ? ];
type responseEntity = {
    code: string,
    msg: string,
    data: any
};
type responseWrap = {
    data: responseEntity
}


const requestCb = (response: responseWrap): responseEntity => {
    if (response.data.code != "0") {
        Vue.prototype.$message(response.data.msg);
    }
    if(response.data.code == '503'){
        // 未登录，自动回去重新登录
        router.push('/login')
    }
    return response.data;
}

export default {
    async post(...params: axiosParams): Promise < responseEntity > {
        const response = await axios.post(...params);
        return requestCb(response);
    },

    async get(...params: axiosParams): Promise < responseEntity > {
        let qs = '';
        let url = params[0];

        if (params[1] != null) {
            // 说明传入了GET参数
            // 暂不兼容递归对象的参数
            for (const key in params[1]) {
                const value = params[1][key];
                if (qs.length > 0) qs += '&'
                qs += key + '=' + value;
            }
        }
        if (qs.length > 0) {
            url += '?' + qs;
        }
        const response = await axios.get(url, params[2]);
        return requestCb(response);
    },
};