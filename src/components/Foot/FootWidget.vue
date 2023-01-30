<script setup lang="ts">
import MusicPlayer from "./MusicPlayer.vue";
</script>

<template>
	<el-row type="flex" align="middle" justify="space-around">
		<MusicPlayer></MusicPlayer>
	</el-row>
</template>

<style scoped>
.el-row {
	height: 100%;
}
</style>