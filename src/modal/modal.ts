// 此文件实现了组件的定义
class Modal {
    public component = {
        // 每个组件的属性
        img: {
            ckey: 'img',
            name: '图片组件',
            text: '',
            url: ''
        },
        text: {
            ckey: 'text',
            name: '文字组件',
            text: '',
        }
    }

    // 根据此数据结构，渲染新增组件的列表    
    public list:any = []

    constructor(){
        for(const key in this.component){
            this.list.push((this.component as any)[key]);
        }
    }
}

const modal = new Modal();
export default modal;