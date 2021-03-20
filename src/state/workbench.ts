import Vue from 'vue'

class workbench {
    public data: {
        editor: {
            page: {
                title: {
                    text: string
                };
                img: {
                    url: string
                };
            }
        },
        component: {
            list: any
        }
    } = {
        editor: {
            page: {
                title: {
                    text: '默认标题'
                },
                img: {
                    url: ''
                }
            }
        },
        component:{
            list: [{"ckey":"img1","name":"图片组件","text":"1111221","url":"1"},{"ckey":"img","name":"图片组件","text":"33","url":""}]
        }
    }

    constructor(){
        this.data = Vue.observable(this.data);
    }

    public setData(params: any){
        // 待定
        Object.assign(this.data, params.data);
    }
}

export default workbench;