<script setup lang="ts">
import { invoke } from "@tauri-apps/api";
import { useStore } from "vuex";
const store = useStore();
let play_state = ref(false);
let player = ref();
let dir = ref("/home/dessera/Music/test.mp3");
let url_playing = ref("");

// 控制目前播放的音乐
// 待修改
// 1. 播放有延迟 -- 读取音乐的时间间隔
// 2. 修改播放列表后音乐会重置
let current_index = computed(() => {
	return store.state.play_list.current_index;
})
let play_list = computed(() => {
	return store.state.play_list.list;
});
watchEffect(async () => {
	try {
		const path = play_list.value[current_index.value];
		const data: number[] = await invoke("get_music_base64", { path });
		const data_blob = new Blob([new Uint8Array(data)], { type: "media/mpeg" });
		url_playing.value = URL.createObjectURL(data_blob);
	} catch (e) {
		url_playing.value = "";
	}
});
// 播放相关操作
// 待修改：
// 多次拖动进度条会卡死
let progress = ref(0);
const update_time = () => {
	if (player.value.src) {
		progress.value = player.value.currentTime / player.value.duration * 100;
	} else {
		progress.value = 0;
	}
};
let updateInProgress = false;
let timerId: any;
const change_play_current = (time: any) => {
	if (updateInProgress) {
		return;
	}
	clearTimeout(timerId);
	updateInProgress = true;
	timerId = setTimeout(() => {
		if (url_playing.value !== "") {
			player.value.currentTime = time / 100 * player.value.duration;
		}
		updateInProgress = false;
	}, 200);
};
const toggle_play_state = async () => {
	if (url_playing.value !== "") {
		play_state.value = !play_state.value;
		play_state.value ? player.value.play() : player.value.pause();
	}
};
</script>

<template>
	<audio crossorigin="true" :src="url_playing" ref="player" @timeupdate="update_time"></audio>
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
		<el-slider v-model="progress" :show-tooltip="false" @input="change_play_current"></el-slider>
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