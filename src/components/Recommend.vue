<template>
    <div class="recommend">
        <div class='list'>
            <el-col :span='5' class='model' v-for='item in activityList' :key='item.activityId'>
                <div class='banner' :style='{backgroundImage:"url(" + item.themeBanner +")"}'></div>
                <div class='mid'>
                    <span>{{item.themeTitle}}</span>
                    <router-link to='workbench'>
                        <el-button>立即创建</el-button>
                    </router-link>
                </div>
                <span class='des'>{{item.themeDescription}}</span>
            </el-col>            
        </div>

    </div>
</template>

<script lang="ts">
    import {
        Component,
        Prop,
        Vue
    } from 'vue-property-decorator';
    import activityManage from '@/axios/api/activityManage';

    @Component
    export default class Recommend extends Vue {
        private activityList = [{
            activityId: 0,
            themeBanner: "",
            themeTitle: "",
            themeDescription: ""
        }]

        public async created() {
            const data = await activityManage.recommendList();
            console.log(data);
            this.activityList = data.data.list;
        }
        
    }
</script>

<style scoped lang="scss">
    .recommend {
        .list{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: flex-start;
            align-content: flex-start;
            margin-top: 20px;
            margin-left: 20px;
            .model{
                margin-right: 20px;
                margin-bottom: 20px;
                box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
                .banner{
                    height: 150px;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
            }
        }
    }
</style>