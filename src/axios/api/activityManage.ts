import axiosAdapter from '../config';

export default {
    recommendList(){
        return axiosAdapter.get('api/backweb/index/allTheme');
    },
    historyList(pageOrder: number, pageNum: number){
        return axiosAdapter.get('api/backweb/manage/list', {pageOrder, pageNum});
    }
}