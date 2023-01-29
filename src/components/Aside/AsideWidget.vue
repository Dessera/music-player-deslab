<template>
	<el-menu default-active="find_music" @select="toggle_router_page">
		<el-sub-menu index="recommend">
			<template #title><span>推荐</span></template>
			<el-menu-item index="find_music">发现音乐</el-menu-item>
			<el-menu-item index="personal_fm">私人FM</el-menu-item>
			<el-menu-item index="mv">MV</el-menu-item>
			<el-menu-item index="friends">朋友</el-menu-item>
		</el-sub-menu>
		<el-sub-menu index="my_music">
			<template #title><span>我的音乐</span></template>
			<el-menu-item index="local_music">本地音乐</el-menu-item>
			<el-menu-item index="download_management">下载管理</el-menu-item>
		</el-sub-menu>
		<el-sub-menu index="play_list">
			<template #title><span>歌单</span></template>
			<el-menu-item index="list-1">我喜欢的音乐</el-menu-item>
		</el-sub-menu>
	</el-menu>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const toggle_router_page = (key: string, keyPath: string[]) => {
	router.push({
		path: `/${key}`
	});
};
</script>

<style scoped>
</style>
