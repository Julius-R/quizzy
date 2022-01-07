import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
	name: "quiz",
	initialState: {
		questions: [],
		wrong: []
	},
	reducers: {
		setQuestions(state, action) {
			state.questions = action.payload;
		},
		updateSelectedAnswer(state, action) {
			state.questions.filter((question) => {
				if (question.id === action.payload.id) {
					question.selectedAnswer = action.payload.selectedAnswer;
				}
			});
		},
		addWrong: (state, action) => {
			state.wrong.push(action.payload);
		},
		resetState: (state) => {
			state.questions = [];
			state.wrong = [];
		}
	}
});

export const { setQuestions, updateSelectedAnswer, addWrong, resetState } =
	quizSlice.actions;
export default quizSlice.reducer;
