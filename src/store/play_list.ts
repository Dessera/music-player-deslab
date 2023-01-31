import { invoke } from "@tauri-apps/api";

export default {
	state: {
		list: [
			"/home/dessera/Music/test.m4a"
		],
		current_index: 0
	},
	getters: {
		base_list(store: any) {
			return store.list.map((item: string) => {
				const dirs = item.split("/");
				return dirs[dirs.length - 1];
			});
		},
		async current_url(store: any) {
			try {
				const raw_url = store.list[store.current_index];
				const data: number[] = await invoke("get_music_base64", { path: raw_url });
				const url = new Blob([new Uint8Array(data)], { type: "media/mpeg" });
				return URL.createObjectURL(url);
			} catch (e) {
				return "";
			}
		}
	},
	mutations: {
		APPEND_LIST(store: any, items: string | string[] | null) {
			if (items instanceof String) {
				store.list.push(items);
			} else if (items) {
				store.list = store.list.concat(items);
			}
		},
		SWITCH_CURRENT_INDEX(store: any, index: number) {
			if (index >= 0 && index < store.list.length) {
				store.current_index = index;
			}
		},
		CURRENT_INDEX_PLUS(store: any) {
			store.current_index++;
			if (store.current_index >= store.list.length) store.current_index = 0;
		}
	},
	actions: {}
}