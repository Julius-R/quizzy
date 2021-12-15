import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";

const store = configureStore({
	reducer: {
		quiz: reducer
	}
});

export default store;
