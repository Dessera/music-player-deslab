import { fs } from "@tauri-apps/api";
/*
 * 保存着全局的启动设置
 */

export default {
	state: {
		option: {
			auto_play_on_start: false
		}
	},
	getters: {},
	mutations: {
		READ_CONFIG(state: any, opt: any) {
			state.option = opt;
		}
	},
	actions: {
		async read_config(context: any) {
			try {
				if (!(await fs.exists("deslab_music/global_options.json", { dir: fs.BaseDirectory.AppConfig }))) {
					await fs.createDir("deslab_music", { dir: fs.BaseDirectory.AppConfig, recursive: true });
				}
				const option = await fs.readTextFile("deslab_music/global_options.json", { dir: fs.BaseDirectory.AppConfig });
				context.commit("READ_CONFIG", JSON.parse(option));
			} catch (_) { }
		},
		async save_config(context: any) {
			try {
				await fs.writeTextFile("deslab_music/global_options.json", JSON.stringify(context.state.option), { dir: fs.BaseDirectory.AppConfig });
			} catch (_) { }
		}
	}
}