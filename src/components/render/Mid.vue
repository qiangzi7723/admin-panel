<template>
	<section class="mid">
		<span>这是中间区域</span>
		<iframe
			:src="config.h5Preview"
			frameborder="0"
			id="iframe"
			ref="rFrame"
		></iframe>
	</section>
</template>

<script lang="ts">
import Vue from "vue";
import config from "@/config/config";

export default class Mid extends Vue {
	private iFrame: any = null;
	private config: typeof config = config;

	private created() {
		this.iFrame = document.getElementById("iframe");
		this.iFrame.onload = () => {
			// 这里有时候会无法执行
		};
	}
}
</script>

<style lang="less" scoped>
.workbench {
	.mid {
		display: flex;
		flex-direction: column;

		iframe {
			width: 375px;
			height: 667px;
			border: 1px solid salmon;
		}
	}
}
</style>
