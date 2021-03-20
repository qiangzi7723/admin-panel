import Vue from 'vue';
import workbench from '@/state/workbench'


class ImgComponent {
    public title: string = '2'
    public url: string = '2'
     
}

const imgComponent = new ImgComponent();
const workbenchState= new workbench()
    
export {
    imgComponent,
    workbenchState
};