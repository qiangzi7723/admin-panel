<template>
	<section class="lt">
		<div class="tab-component">
			<p class="title">组件列表</p>
			<div class="component-list">
				<div
					class="component-item"
					v-for="(item, index) of workbenchState.data.component.list"
					:key="index"
				>
					<span>{{ item.name }}</span>
				</div>
			</div>
		</div>
		<el-button
			type="primary"
			@click="aside.componentAdd.show = true"
			size="mini"
			>添加组件</el-button
		>
		<div class="tab-add-component" v-show="aside.componentAdd.show">
			<p class="title">选择新增组件</p>
			<i class="el-icon-close" @click="aside.componentAdd.show = false"></i>

			<div class="component-add">
				<div class="componnet-add-item">
					<div
						class="component-item"
						v-for="(item, index) of modal.list"
						:key="index"
						:data-ckey="item.ckey"
						@click="addComponent"
					>
						<span>{{ item.name }}</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { workbenchState } from "@/state/index";
import modal from "@/modal/modal";

@Component
export default class Aside extends Vue {
	private aside = {
		componentAdd: {
			show: false,
		},
		componentList: [{}],
	};

	private workbenchState = workbenchState;
	private modal = modal;

	private addComponent(e: any) {
		this.aside.componentAdd.show = false;
		const ckey: string = e.currentTarget.getAttribute("data-ckey");
		workbenchState.data.component.list.push((modal.component as any)[ckey]);
		console.log(workbenchState.data.component.list);
	}
}
</script>

<style scoped lang="less">
.lt {
	border: 1px solid blueviolet;
	height: 100%;
	box-shadow: 0 10px 10px 5px #eee;
	position: relative;
	width: 200px;

	.component-list {
		margin-top: -10px;
		margin-bottom: 10px;
	}

	.component-item {
		text-align: left;
		padding: 4px;
		padding-left: 20px;
		border-bottom: 1px solid #ebeef5;

		span {
			font-size: 14px;
		}
	}

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

		.component-add {
			margin-top: -10px;
		}
	}
}
</style>
