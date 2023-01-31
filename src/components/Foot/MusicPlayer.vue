<script setup lang="ts">
import { invoke } from "@tauri-apps/api";
import { useStore } from "vuex";
const store = useStore();
// 从store中读取全局设置
let auto_play_flag: boolean = store.state.boot_option.option.auto_play_on_start;
// 播放状态以及播放器
let playable = ref(false);
let play_state = ref(auto_play_flag);
let player = ref();

// 控制目前播放的音乐
// 待修改
// 1. 修改播放列表后音乐会重置
let url_playing = ref("");
watchEffect(async () => {
	url_playing.value = await store.getters.current_url;
});
const play_end_handler = () => {
	play_state.value = false;
	playable.value = false;
	store.commit("CURRENT_INDEX_PLUS");
};
const can_play_handler = () => {
	playable.value = true;
	if (!auto_play_flag) {
		auto_play_flag = !auto_play_flag;
		return;
	}
	play_state.value = true;
	player.value.play();
};
// 播放相关操作
// 待修改：
// 多次拖动进度条会卡死
let progress = ref(0);
const update_time = () => {
	if (updateInProgress.value) return;
	if (player.value.src) {
		progress.value = player.value.currentTime / player.value.duration * 100;
	} else {
		progress.value = 0;
	}
};
let updateInProgress = ref(false);
const change_play_current = (time: any) => {
	if (playable.value) {
		player.value.currentTime = time / 100 * player.value.duration;
	}
	updateInProgress.value = false;
};
const toggle_play_state = async () => {
	if (playable.value) {
		play_state.value = !play_state.value;
		play_state.value ? player.value.play() : player.value.pause();
	}
};
</script>

<template>
	<audio 
		preload="auto" 
		crossorigin="true" 
		:src="url_playing" 
		ref="player" 
		@canplay="can_play_handler"
		@timeupdate="update_time" 
		@ended="play_end_handler">
	</audio>
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
		<el-slider 
			v-model="progress" 
			:show-tooltip="false" 
			@change="change_play_current"
			@mousedown="updateInProgress = true">
		</el-slider>
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