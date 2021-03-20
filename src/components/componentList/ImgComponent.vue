<template>
	<div class="component-tab-img">
		<div class='component-title' @click="content.show=!content.show">
			<span>{{item.name}}</span>
			<span>></span>
		</div>
		<div class='component-content' v-show='content.show'>
			<div class='e-content'>
				<div class='e-line'>
					<p>标题</p>
					<el-input placeholder="请输入内容" size="mini" v-model="content.title" @change='change'>
					</el-input>
				</div>
			</div>
			<div class='e-content'>
				<div class='e-line'>
					<p>头图</p>
					<el-upload class="el-uploader" action="" :http-request="uploadFile">
						<img v-if="content.url" :src="content.url" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
			</div>
		</div>

	</div>
</template>

<script lang="ts">
	import {
		Component,
		Prop,
		Vue
	} from 'vue-property-decorator';
	import upload from '@/axios/api/upload'
	import state from '@/state/index'

	@Component
	export default class ImgComponnet extends Vue {
		@Prop() private item!: string;

		private content = {
			show: false,
			title: state.imgComponent.title
		}

		private async uploadFile(e: any) {
			const data = await upload.upload("2302", e.file);
			console.log(data);
		}

		private change(e: any){
			state.imgComponent.title = e;
			console.log(e);
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>