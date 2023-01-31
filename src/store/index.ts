import { createStore } from "vuex";
import play_list from "./play_list";
import boot_option from "./boot_option";

export default createStore({
	modules: {
		play_list, boot_option
	}
});