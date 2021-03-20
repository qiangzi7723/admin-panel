class Modal {
    public component = {
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

    public list:any = []

    constructor(){
        for(const key in this.component){
            this.list.push((this.component as any)[key]);
        }
    }
}

const modal = new Modal();
export default modal;