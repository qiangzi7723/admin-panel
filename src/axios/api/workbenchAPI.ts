import axiosAdapter from '../config';

export default {
    change(activityId: string, config: object){
        return axiosAdapter.post('/api/backweb/workbench/page/change', {
            activityId, pageConfig: JSON.stringify(config)
        })
    },
    boot(){
        return axiosAdapter.get('/api/backweb/workbench/base/boot', {
            activityId: 2302
        })
    },
    
}