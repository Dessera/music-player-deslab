<script setup lang="ts">
import MusicPlayer from "./MusicPlayer.vue";
import AudioList from "./AudioList.vue";

const visible = ref(false);
</script>

<template>
	<el-row type="flex" align="middle" justify="space-around">
		<MusicPlayer></MusicPlayer>
		<el-popover :visible="visible" placement="top" title="播放列表" :width="300">
			<template #reference>
				<el-button @click="visible = !visible"><el-icon>
						<i-ep-expand v-show="visible"/>
						<i-ep-fold v-show="!visible"/>
				</el-icon></el-button>
			</template>
			<template #default>
				<AudioList></AudioList>
			</template>
		</el-popover>
	</el-row>
</template>

<style scoped>
.el-row {
	height: 100%;
}
</style>