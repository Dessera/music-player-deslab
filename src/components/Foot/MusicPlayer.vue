<script setup lang="ts">
import { invoke } from "@tauri-apps/api";
import { useStore } from "vuex";
let progress = ref(0);
let play_state = ref(false);
let player = ref();
let dir = ref("/home/dessera/Music/test.mp3");
let url = ref("");

const get_url = async () => {
	const data: number[] = await invoke("get_music_base64", { path: dir.value });
	const data_blob = new Blob([new Uint8Array(data)], { type: "media/mpeg" });
	url.value = URL.createObjectURL(data_blob);
};

const toggle_play_state = async () => {
	play_state.value = !play_state.value;
	await get_url();
	play_state.value ? player.value.play() : player.value.pause();
};
</script>

<template>
	<audio crossorigin="true" :src="url" ref="player"></audio>
	<el-row type="flex" align="middle" justify="space-around" class="player_widget">
		<el-button type="danger" circle size="small">
			<el-icon><i-ep-arrow-left /></el-icon>
		</el-button>
		<el-link type="danger" :underline="false" circle @click="toggle_play_state">
			<el-icon>
				<i-ep-video-play v-show="!play_state" />
				<i-ep-video-pause v-show="play_state" />
			</el-icon>
		</el-link>
		<el-button type="danger" circle size="small">
			<el-icon><i-ep-arrow-right /></el-icon>
		</el-button>
	</el-row>
	<div class="whitespace">
		<el-slider v-model="progress" :show-tooltip="false"></el-slider>
	</div>
</template>

<style scoped>
.el-link {
	font-size: 40px;
	padding: 0 10px;
}

.player_widget {
	height: 100%;
}

.whitespace {
	flex-grow: 1;
	padding: 0 40px;
}

.el-slider {
	height: 100%;
}
</style>