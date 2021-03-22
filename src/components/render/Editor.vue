<script lang="tsx">
import { Component, Prop, Vue } from "vue-property-decorator";
import activityManage from "@/axios/api/activityManage";
import Input from "@/components/item/Input.vue";
import ImageUpload from "@/components/item/ImageUpload.vue";
import ImageComponnet from "@/components/componentList/ImageComponent.vue";
import TextComponent from "@/components/componentList/TextComponent.vue";
import { workbenchState } from "@/state/index";
import workbenchAPI from "@/axios/api/workbenchAPI";

@Component({
	components: {
		Input,
		ImageUpload,
		ImageComponnet,
		TextComponent,
	},
})
export default class Editor extends Vue {
	private resize = {
		cx: 0,
		width: 400,
	};

	private workbenchState = workbenchState;

	private mouseDown(e: MouseEvent) {
		this.resize.cx = e.clientX;
		document.addEventListener("mousemove", this.mouseMove);
		document.addEventListener("mouseup", this.mouseUp);
	}

	private mouseMove(e: MouseEvent) {
		// 加一个节流
		this.resize.width -= e.movementX;
	}

	private mouseUp(e: MouseEvent) {
		document.removeEventListener("mousemove", this.mouseMove);
		document.removeEventListener("mouseup", this.mouseUp);
	}

	private imgUpload = {
		src: "",
	};
	private title = "";

	public async created() {}

	private save() {
		workbenchAPI.change("2302", workbenchState);
	}

	private render() {
		const resizeSty = {
			width: this.resize.width + "px",
		};

		return (
			<section class="rt" style={resizeSty}>
				<div class="rt-border" mousedown="mouseDown"></div>
				<section class="editor">
					<div class="e-tab">
						<p>页面配置</p>
						<Input
							title="标题"
							onSave={this.save}
							v-model={workbenchState.data.editor.page.title.text}
						></Input>
						<ImageUpload
							title="背景图片"
							save={this.save}
							v-model={workbenchState.data.editor.page.img.url}
						></ImageUpload>
					</div>
					<div class="e-tab">
						<p>组件配置</p>
						{workbenchState.data.component.list.map((item, index) => {
							if (item.ckey == "img") {
								return (
									<ImageComponnet key={index} item={item}></ImageComponnet>
								);
							} else if (item.ckey == "text") {
								return <TextComponent key={index} item={item}></TextComponent>;
							}
						})}
					</div>
				</section>
			</section>
		);
	}
}
</script>

<style lang="less" scoped>
.workbench {
	.rt {
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
			> p {
				font-size: 12px;
				border-left: 4px solid #589ef8;
				text-align: left;
				padding: 8px 15px;
				font-weight: 700;
				border-bottom: 1px dashed #eee;
				background-color: #eef5fe;
			}
		}
	}
}
</style>
