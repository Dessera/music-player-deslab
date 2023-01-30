<script setup lang="ts">
import TopWidget from "./Header/TopWidget.vue"
import AsideWidget from "./Aside/AsideWidget.vue";
import FootWidget from "./Foot/FootWidget.vue";
// 移动侧边栏指令
// #region v-move
const vMove = {
	mounted: (el: HTMLElement, bindings: any) => {
		el.onmousedown = function (e) {
			const init = e.clientX;
			let target = document.getElementById(bindings.value);
			if (target) {
				const init_width = target.offsetWidth;
				document.onmousemove = function (e) {
					const max_width = window.innerWidth / 2;
					let nwidth = e.clientX - init + init_width;
					if (nwidth > max_width) nwidth = max_width;
					if (nwidth < 200) nwidth = 200;
					if (target) target.style.width = nwidth + "px";
					e.preventDefault();
				};
				document.onmouseup = function () {
					document.onmousemove = document.onmouseup = null;
				};
			}
		}
	}
};
// #endregion

</script>

<template>
	<el-container class="widget">
		<el-header height="50px">
			<TopWidget></TopWidget>
		</el-header>
		<el-container>
			<el-aside width="200px" id="movable">
				<AsideWidget></AsideWidget>
			</el-aside>
			<el-col v-move="'movable'" class="adjust"></el-col>
			<el-container>
				<el-main>
					<router-view></router-view>
				</el-main>
				<el-footer>
					<FootWidget></FootWidget>
				</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<style scoped>
.widget {
	width: 100vw;
	height: 100vh;
	/* overflow: hidden; */
}

.widget>.el-header {
	padding: 0;
}

.widget>.el-container {
	overflow: hidden;
}

.adjust {
	flex: 0 0 2px;
	cursor: col-resize;
}
</style>
