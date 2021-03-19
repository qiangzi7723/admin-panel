<template>
    <div class="historyAc">
        <el-table :data="list" stripe style="width: 100%">
            <el-table-column prop="id" label="活动ID" width="180">
            </el-table-column>
            <el-table-column prop="name" label="活动名称" width="180">
            </el-table-column>
            <el-table-column prop="adminUserName" label="创建者">
            </el-table-column>
        </el-table>
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
    export default class HistoryAc extends Vue {
        public async created(){
            const data = await activityManage.historyList(0, 10);
            this.list = data.data.activityList.list;
        }

        private list = [{
            adminUserName: "强子",
            endTime: "2021-03-12 23:59:59.0",
            id: 2618,
            name: "扭蛋机模板",
            publishVersion: 0,
            startTime: "2021-03-12 00:00:00.0",
            status: "edit",
            updateAt: "2021-03-12 16:49:24",
            url: "http://cdn.via.cool/jtp-host/entry/GtkjisHuXqoVRYANzGTFONvj.html",
            urlKey: "eggMachine"
        }]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .historyAc {
    }
</style>