import { createRouter, createWebHashHistory } from "vue-router"
import FindMusic from "@/components/Main/Recommend/FindMusic.vue";
import Friends from "@/components/Main/Recommend/Friends.vue";
import MV from "@/components/Main/Recommend/MV.vue";
import PersonalFM from "@/components/Main/Recommend/PersonalFM.vue";
import LocalMusic from "@/components/Main/Local/LocalMusic.vue";
import Download from "@/components/Main/Local/Download.vue";

const routes = [
	{
		path: "/",
		redirect: "/find_music"
	}, {
		path: "/find_music",
		component: FindMusic
	}, {
		path: "/friends",
		component: Friends
	}, {
		path: "/mv",
		component: MV
	}, {
		path: "/personal_fm",
		component: PersonalFM
	}, {
		path: "/local_music",
		component: LocalMusic
	}, {
		path: "/download_management",
		component: Download
	}
]

export default createRouter({
	history: createWebHashHistory(),
	routes
});
