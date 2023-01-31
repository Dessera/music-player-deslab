<script setup lang="ts">
import MainWidget from "./components/MainWidget.vue";

</script>

<template>
	<MainWidget v-cloak></MainWidget>
</template>

<style>
.theme_color {
	background-color: #C20C0C;
}

[v-cloak] {
	display: none;
}
</style>
