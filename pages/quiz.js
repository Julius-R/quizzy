import Layout from "../components/Layout";
import Question from "../components/Question";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {  addWrong } from "../store/reducers";
import { Steps, Button, ButtonGroup } from "rsuite";
import {useRouter} from "next/router";

export default function Quiz() {
	const dispatch = useDispatch();
	const questions = useSelector((state) => state.quiz.questions);

	const router = useRouter();
	const submitQuiz = () => {
		questions.forEach((question) => {
			if (question.selectedAnswer !== question.correctAnswer) {
				dispatch(addWrong(question));
			}
		});
		router.push({ pathname: `results`, query: { quizComplete: true } });
	};

	const [currentQuestion, setCurrentQuestion] = React.useState(questions[0]);
	const [step, setStep] = React.useState(0);
	const onChange = (nextStep) => {
		setCurrentQuestion(questions[nextStep]);
		setStep(nextStep < 0 ? 0 : nextStep > 9 ? 0 : nextStep);
	};
	const onNext = () => onChange(step + 1);

	return (
		<Layout>
			<section className="quiz-view">
				<Steps current={step} className="count">
					<Steps.Item />
					<Steps.Item />
					<Steps.Item />
					<Steps.Item />
					<Steps.Item />
					<Steps.Item />
					<Steps.Item />
					<Steps.Item />
					<Steps.Item />
					<Steps.Item />
				</Steps>
				<hr />
				<p className="txt-dark-black txt-md">Question #{step + 1}</p>
				<Question question={currentQuestion} />
				<ButtonGroup>
					<Button onClick={onNext} disabled={step === 9}>
						Skip
					</Button>
					{step <= 8 ? (
						<Button onClick={onNext}>Next</Button>
					) : (
						<Button onClick={submitQuiz}>Submit</Button>
					)}
				</ButtonGroup>
			</section>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	if (ctx.query.id === undefined) {
		return {
			redirect: {
				destination: "/",
				permanent: false
			}
		};
	}
	return { props: {} };
}