import Vue from "vue";

class workbench {
	// 数据共享
	public data: {
		editor: {
			page: {
				title: {
					text: string;
				};
				img: {
					url: string;
				};
			};
		};
		component: {
			list: [
				{
					ckey?: string;
					img?: string;
					text?: string;
					url?: string;
					name?: string;
				}
			];
		};
	} = {
		editor: {
			page: {
				title: {
					text: "默认标题",
				},
				img: {
					url: "",
				},
			},
		},
		component: {
			list: [],
		},
	};

	constructor() {
		this.data = Vue.observable(this.data);
	}

	public setData(params: any) {
		// 待定
		Object.assign(this.data, params.data);
	}
}

export default workbench;
