import { List } from "@element-plus/icons-vue"

export default {
	state: {
		list: [
			"/home/dessera/Music/test.m4a"
		],
	},
	getters: {
		base_list(store: any) {
			return store.list.map((item: string) => {
				const dirs = item.split("/");
				return dirs[dirs.length - 1];
			});
		}
	},
	mutations: {
		APPEND_LIST(store: any, items: string | string[] | null) {
			if (items instanceof String) {
				store.list.push(items);
			} else if (items) {
				store.list = store.list.concat(items);
			}
		}
	},
	actions: {}
}