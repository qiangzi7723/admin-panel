import axiosAdapter from '../config';

export default {
    login(name: string, password: string){
        return axiosAdapter.post('/api/backweb/auth/login', {
            name, password
        })
    }
}