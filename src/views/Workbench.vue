<template>
	<div class="workbench">
		<header class="top">
			<div class="top-left">
				<span class="back" @click="back">⬅返回</span>
			</div>
			<div class="top-right">
				<el-button type="primary">发布活动</el-button>
			</div>
		</header>
		<main class="main">
			<Aside></Aside>
			<Mid></Mid>
			<Editor></Editor>
		</main>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import upload from "@/axios/api/upload";
import workbenchAPI from "@/axios/api/workbenchAPI";
import { workbenchState } from "@/state/index";
import Editor from "@/components/render/Editor.vue";
import Aside from "@/components/render/Aside.vue";
import Mid from "@/components/render/Mid.vue";
import modal from "@/modal/modal";

@Component({
	components: {
		Editor,
		Aside,
		Mid,
	},
})
export default class Workbench extends Vue {
	private aside = {
		componentAdd: {
			show: true,
		},
		componentList: [{}],
	};

	private back() {
		this.$router.push("/");
	}

	private async created() {
		const data = await workbenchAPI.boot();
		console.log(data.data);
		const pageConfig = JSON.parse(data.data.pageConfig);
		workbenchState.setData(pageConfig);
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
	}
}
</style>
