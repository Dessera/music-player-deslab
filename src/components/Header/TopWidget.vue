<template>
	<el-row type="flex" class="theme_color">
		<div data-tauri-drag-region class="white_space"></div>
		<el-divider direction="vertical" />
		<WindowToolBox></WindowToolBox>
	</el-row>
</template>

<script lang="ts" setup>
import WindowToolBox from './WindowToolBox.vue';
import { ref } from 'vue'

</script>

<style scoped>
.el-row {
	height: 100%;
	align-items: center;
}
.el-divider {
	border-color: rgba(143, 143, 143, 0.541);
	/* background-color: gray; */
}

.white_space {
	flex-grow: 1;
	height: 100%;
}
</style>

