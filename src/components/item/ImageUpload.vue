<template>
	<div class="e-line">
		<p>{{ title }}</p>
		<el-upload class="el-uploader" action="" :http-request="uploadFile">
			<img v-if="innerValue" :src="innerValue" class="avatar" />
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import upload from "@/axios/api/upload";

@Component
export default class ImageUpload extends Vue {
	@Prop() private title!: string;
	@Prop() private value!: string;

	private innerValue: string = this.value;

	private async uploadFile(e: any) {
		const data = await upload.upload("2302", e.file);
		this.innerValue = data.data.url;
		this.$emit("input", this.innerValue);
		this.$parent.save();
	}

	@Watch("value")
	public watchValue() {
		this.innerValue = this.value;
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.e-line {
	display: flex;
	align-items: center;
	margin-bottom: 20px;

	> p {
		flex: 1;
		margin: 0;
		text-align: start;
		padding-left: 20px;
	}

	.el-uploader {
		flex: 2;
		text-align: left;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 80px;
		height: 80px;
		line-height: 80px;
		text-align: center;
		border: 1px dashed #d9d9d9;
		border-color: #409eff;
		border-radius: 6px;
	}

	.avatar {
		width: 80px;
		height: 80px;
		border: 1px dashed #d9d9d9;
		border-color: #409eff;
		border-radius: 6px;
		display: block;
	}
}
</style>
