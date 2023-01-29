<template>
	<el-row type="flex">
		<el-link type="info" :underline="false" @click="minimize">
			<el-icon><i-ep-minus /></el-icon>
		</el-link>
		<el-link type="info" :underline="false" @click="maximize">
			<el-icon><i-ep-full-screen /></el-icon>
		</el-link>
		<el-link type="info" :underline="false" @click="close_widget">
			<el-icon><i-ep-close /></el-icon>
		</el-link>
	</el-row>
</template>

<script lang="ts" setup>
import { appWindow } from "@tauri-apps/api/window";

// #region window methods
async function minimize() {
	console.log("Minimizing...");
	await appWindow.minimize();
}

async function maximize() {
	await appWindow.toggleMaximize();
}

async function close_widget() {
	await appWindow.close();
}
// #endregion

</script>

<style scoped>
.el-icon {
	/* font-size: large; */
	font-weight: bold;
	color: rgb(201, 201, 201);
}

.el-icon:hover {
	color: white;
	border: 0;
}

.el-link {
	padding: 5px;
}
</style>