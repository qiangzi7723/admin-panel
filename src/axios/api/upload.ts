import axiosAdapter from '../config';

export default {
    upload(activityId: string, file: File){
        const data = new FormData();
        data.append('file', file);
        data.append('activityId', activityId);
        return axiosAdapter.post('/api/backweb/workbench/uploadFile', data);
    }
}