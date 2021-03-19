<template>
	<div class="home">
		<el-col :span="3" class='aside'>
			<el-menu default-active="recommend" class="el-menu-vertical"
				background-color="#304156" text-color="#fff" active-text-color="#ffd04b">
				<el-menu-item index="top">
					<span slot="title">顶部</span>
				</el-menu-item>
				<el-menu-item index="recommend" @click="handle">
					<i class="el-icon-menu"></i>
					<span slot="title">模板中心</span>
				</el-menu-item>
				<el-menu-item index="historyAc" @click="handle">
					<i class="el-icon-setting"></i>
					<span slot="title">活动管理</span>
				</el-menu-item>
			</el-menu>
		</el-col>
		<div class='main'>
			<Recommend v-if='canShow("recommend")'></Recommend>
			<HistoryAc v-if='canShow("historyAc")'></HistoryAc>
		</div>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Watch
	} from 'vue-property-decorator';
	import Recommend from '@/components/Recommend.vue';
	import HistoryAc from '@/components/HistoryAc.vue';

	@Component({
		components: {
			Recommend,
			HistoryAc
		},
	})
	export default class Home extends Vue {
		private index = "recommend";

		handle(e: any){
			this.index = e.index;
		}

	    // TODO 待优化
        public canShow(value: any) {
			console.log('当前点击版块' + value);
			if(value == this.index){
				return true;
			}
			return false;
        }
	}
</script>

<style lang="less">
	.home {
		height: 100vh;
		display: flex;
		.aside {
			height: 100%;
			.el-menu-vertical {
				height: 100%;
			}
		}

		.main{
			width: 100%;
			height: 100%;
			position: relative;
		}
	}
</style>