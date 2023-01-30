<script setup lang="ts">
import { useStore, mapMutations } from 'vuex';
import { open } from "@tauri-apps/api/dialog";
import { ElMessage } from 'element-plus';
const store = useStore();

// 包含目前播放列表文件名的 :string[]
let base_list = computed(() => {
	return store.getters.base_list;
});

// 添加播放逻辑在此
const append_list = async () => {
	try {
		const res = await open({
			"multiple": true,
			"title": "打开音频文件",
			"filters": [{
				name: "音频",
				extensions: ["mp3", "m4a", "wav"]
			}],
		});
		store.commit("APPEND_LIST", res);
	} catch (e: any) {
		ElMessage.error(`添加失败:${e}`);
	}
};

</script>

<template>
	<div class="list">
		<el-link v-for="(item, index) in base_list" :key="index">{{ item }}</el-link>
		<el-link type="primary" @click="append_list">添加</el-link>
	</div>
</template>

<style scoped>
.list {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	height: 300px;
	overflow: auto;
}
</style>
