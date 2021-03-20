<template>
    <section class='rt' :style="{width: resize.width + 'px'}">
        <span>这是编辑器</span>
        <div class='rt-border' @mousedown='mouseDown'></div>
        <section class='editor'>
            <div class='e-tab'>
                <p>页面配置</p>
                <Input title='标题' save='save' v-model='workbenchState.data.editor.page.title.text'></Input>
                <div class='e-content'>
                    <div class='e-line'>
                        <p>头图</p>
                        <el-upload class="el-uploader" action="" :http-request="uploadFile">
                            <img v-if="imgUpload.src" :src="imgUpload.src" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>
            </div>
            <div class='e-tab'>
                <p>组件配置</p>
                <!-- <div class='component-edit' v-for='item of aside.componentList' :key='item.ckey'>
                    <ImgComponnet v-if='item.ckey == "img"' :item=item></ImgComponnet>
                </div> -->
            </div>
        </section>
    </section>
</template>

<script lang="ts">
    import {
        Component,
        Prop,
        Vue
    } from 'vue-property-decorator';
    import activityManage from '@/axios/api/activityManage';
    import Input from '@/components/item/Input.vue'
    import {
        workbenchState
    } from '@/state/index'
    import workbenchAPI from '@/axios/api/workbenchAPI'


    @Component({
        components: {
            Input
        }
    })
    export default class Editor extends Vue {
        private resize = {
            cx: 0,
            width: 400
        }

        private workbenchState= workbenchState;

        private mouseDown(e: MouseEvent) {
            this.resize.cx = e.clientX;
            document.addEventListener('mousemove', this.mouseMove);
            document.addEventListener('mouseup', this.mouseUp);
        }

        private mouseMove(e: MouseEvent) {
            // 加一个节流
            this.resize.width -= e.movementX;
        }

        private mouseUp(e: MouseEvent) {
            document.removeEventListener('mousemove', this.mouseMove);
            document.removeEventListener('mouseup', this.mouseUp);
        }


        private imgUpload = {
            src: ''
        }
        private title = ''

        public async created() {}


        private async uploadFile(e: any) {
            const data = await upload.upload("2302", e.file);
            console.log(data);
            this.imgUpload.src = data.data.url;
        }

        private save() {
            workbenchAPI.change('2302', workbenchState);
        }
    }
</script>

<style lang="less" scoped>
    .workbench {
        .rt {
            border: 1px solid red;
            box-shadow: 0 10px 10px 5px #eee;
            position: relative;

            .rt-border {
                top: 0;
                left: -1px;
                height: 100%;
                width: 2px;
                cursor: ew-resize;
                position: absolute;

                &:hover {
                    background-color: #589ef8;
                }
            }

            .e-tab {
                >p {
                    font-size: 12px;
                    border-left: 4px solid #589ef8;
                    text-align: left;
                    padding: 8px 15px;
                    font-weight: 700;
                    border-bottom: 1px dashed #eee;
                    background-color: #eef5fe;
                }

                .e-line {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;

                    >p {
                        flex: 1;
                        margin: 0;
                        text-align: start;
                        padding-left: 10px;
                    }

                    .el-input {
                        flex: 2;
                    }

                    .el-uploader,
                    .el-upload {
                        border: 1px dashed #d9d9d9;
                        border-radius: 6px;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                    }

                    .el-uploader,
                    .el-upload:hover {
                        border-color: #409EFF;
                    }

                    .avatar-uploader-icon {
                        font-size: 28px;
                        color: #8c939d;
                        width: 80px;
                        height: 80px;
                        line-height: 80px;
                        text-align: center;
                    }

                    .avatar {
                        width: 80px;
                        height: 80px;
                        display: block;
                    }
                }
            }
        }

    }
</style>