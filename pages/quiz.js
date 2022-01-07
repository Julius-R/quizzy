import React from "react";
import Layout from "../components/Layout";
import Question from "../components/Question";
import { useSelector, useDispatch } from "react-redux";
import { addWrong } from "../store/quizSlice";
import {useRouter} from "next/router";

export default function Quiz() {
	const dispatch = useDispatch();
	const router = useRouter();
	const questions = useSelector((state) => state.quiz.questions);
	const submitQuiz = () => {
		questions.forEach((question) => {
			if (question.selectedAnswer !== question.correctAnswer) {
				dispatch(addWrong(question));
			}
		});
		router.push({ pathname: `results`, query: { quizComplete: true } });
	};
	const [step, setStep] = React.useState(0);
	return (
		<Layout>
			<section className="quiz">
				<div className="container">
					<Question currentStep={step} question={questions[step]} />
					{step <= 8 ? (
						<button className="blu-bg" onClick={() => setStep(step + 1)}>Next</button>
					) : (
						<button className="blu-bg" onClick={submitQuiz}>Submit</button>
					)}
				</div>
			</section>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	if (ctx.query.sessionID === undefined) {
		return {
			redirect: {
				destination: "/",
				permanent: false
			}
		};
	}
	return { props: {} };
}
