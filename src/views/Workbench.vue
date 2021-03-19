<template>
    <div class="workbench">
        <header class="top">
            <div class="top-left">
                <span class='back' @click="back">⬅返回</span>
            </div>
            <div class='top-right'>
                <el-button type="primary" @click='publish'>发布活动</el-button>
            </div>
        </header>
        <main class='main'>
            <section class='lt'>
                <span>这是侧边栏</span>
                <div class='tab-component'>
                    <p class="title">组件列表</p>
                    <div class='component-list'>
                        <div class='component-item' v-for='item of aside.componentList' :key='item.ckey'>
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
                <el-button type='primary' @click="aside.componentAdd.show=true">添加组件</el-button>
                <div class='tab-add-component' v-show='aside.componentAdd.show'>
                    <p class="title">选择新增组件</p>
                    <i class='el-icon-close' @click="aside.componentAdd.show=false"></i>

                    <div class='component-add'>
                        <div class='componnet-add-item' @click="addComponent" data-ckey='img'>
                            <span>图片组件</span>
                        </div>
                    </div>
                </div>
            </section>
            <section class='mid'>
                <span>这是中间区域</span>
                <iframe src="http://192.168.31.186:8081/home?activityId=2302" frameborder="0" id='iframe'
                    ref='rFrame'></iframe>
            </section>
            <section class='rt' :style="{width: editerWidth + 'px'}">
                <span>这是编辑器</span>
                <div class='rt-border' @mousedown='mouseDown'></div>
                <section class='editor'>
                    <div class='e-tab'>
                        <p>页面配置</p>
                        <div class='e-content'>
                            <div class='e-line'>
                                <p>标题</p>
                                <el-input placeholder="请输入内容" size="mini" v-model="title">
                                </el-input>
                            </div>
                        </div>
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
                        <div class='component-edit' v-for='item of aside.componentList' :key='item.ckey'>
                            <ImgComponnet v-if='item.ckey == "img"' :item=item></ImgComponnet>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Watch
    } from 'vue-property-decorator';
    import upload from '@/axios/api/upload';
    import workbenchAPI from '@/axios/api/workbenchAPI';
    import ImgComponnet from '@/components/componentList/ImgComponent.vue';

    @Component({
        components:{
            ImgComponnet
        }
    })

    export default class Workbench extends Vue {
        private mouseTrack = {
            cx: 0,
            cy: 0,
            mx: 0,
            my: 0
        }

        private editerWidth = 400;
        private imgUpload = {
            src: ''
        }
        private title = ''
        private iFrame: any = null

        private aside = {
            componentAdd: {
                show: true
            },
            componentList: [{}]
        }

        private back() {
            this.$router.push('/');
        }

        private mouseDown(e: MouseEvent) {
            this.mouseTrack.cx = e.clientX;
            document.addEventListener('mousemove', this.mouseMove);
            document.addEventListener('mouseup', this.mouseUp);
        }

        private mouseMove(e: MouseEvent) {
            // 加一个节流
            this.editerWidth -= e.movementX;
        }

        private mouseUp(e: MouseEvent) {
            document.removeEventListener('mousemove', this.mouseMove);
            document.removeEventListener('mouseup', this.mouseUp);
        }

        private async uploadFile(e: any) {
            const data = await upload.upload("2302", e.file);
            console.log(data);
            this.imgUpload.src = data.data.url;
        }

        private async created() {
            const data = await workbenchAPI.boot();
            console.log(data.data);
            const pageConfig = JSON.parse(data.data.pageConfig);
            this.imgUpload.src = pageConfig.url;
            this.title = pageConfig.title;

            this.iFrame = document.getElementById('iframe');
            this.iFrame.onload = () => {
                // 这里有时候会无法执行

            }

        }

        private async publish() {
            const config = {
                url: this.imgUpload.src,
                title: this.title
            }
            await workbenchAPI.change("2302", config);
            this.iFrame.contentWindow.postMessage({
                data: config,
                from: 'workbench'
            }, 'http://192.168.31.186:8081');
        }

        private componentDefine = {
            img: {
                ckey: 'img',
                name: '图片组件'
            }
        }

        private addComponent(e: any){
            this.aside.componentAdd.show = false;
            const ckey:string = e.currentTarget.getAttribute('data-ckey'); 
            const component = {
                ckey
            }
            this.aside.componentList.push((this.componentDefine as any)[ckey]);
            console.log(this.aside.componentList)
        }
    }
</script>

<style lang="less" scoped>
    .workbench {
        display: flex;
        flex-direction: column;
        height: 100vh;

        .title {
            font-size: 12px;
            border-left: 4px solid #589ef8;
            text-align: left;
            padding: 8px 15px;
            font-weight: 700;
            border-bottom: 1px dashed #eee;
            background-color: #eef5fe;
        }

        .top {
            display: flex;
            flex-direction: row;
            justify-content: space-around;

            .top-left {
                .back {
                    padding: 10px;
                    cursor: pointer;
                }
            }

        }

        .mid {
            display: flex;
            flex-direction: column;

            iframe {
                width: 375px;
                height: 667px;
                border: 1px solid salmon;
            }
        }

        .main {
            display: flex;
            justify-content: space-between;
            height: 100%;

            .lt {
                border: 1px solid blueviolet;
                height: 100%;
                box-shadow: 0 10px 10px 5px #eee;
                position: relative;
                width: 200px;

                .tab-add-component {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 2;
                    background-color: #fff;
                    padding-top: 20px;

                    .el-icon-close {
                        cursor: pointer;
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                }


            }

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
    }
</style>