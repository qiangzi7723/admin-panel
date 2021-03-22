<template>
	<div class="component-tab-img">
		<div class="component-title" @click="content.show = !content.show">
			<span>{{ item.name }}</span>
		</div>
		<div class="component-content" v-show="content.show">
			<Input title="文案" save="save" v-model="item.text"></Input>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import upload from "@/axios/api/upload";
import { workbenchState } from "@/state/index";
import ImageUpload from "@/components/item/ImageUpload.vue";
import Input from "@/components/item/Input.vue";
import workbenchAPI from "@/axios/api/workbenchAPI";

@Component({
	components: {
		Input,
		ImageUpload,
	},
})
export default class TextComponent extends Vue {
	@Prop() private item!: string;

	private content = {
		show: false,
	};

	private workbenchState = workbenchState;

	private save() {
		workbenchAPI.change("2302", workbenchState);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.component-tab-img {
	.component-title {
		border-color: #eee;
		color: #333;
		font-weight: 700;
		padding: 0 20px;
		height: 36px;
		line-height: 36px;
		border-top: 1px solid #ebeef5;
		border-bottom: 1px solid #ebeef5;
		text-align: left;
		font-size: 14px;
	}
}
.component-content {
	margin-top: 20px;
}
</style>
