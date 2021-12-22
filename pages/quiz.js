import Layout from "../components/Layout";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedAnswer, addWrong } from "../store/reducers";
import { Steps, Button, ButtonGroup } from "rsuite";
import {useRouter} from "next/router";

export default function Quiz() {
	const dispatch = useDispatch();
	const questions = useSelector((state) => state.quiz.questions);

	const router = useRouter();
	// Finish the logic for submitting the quiz
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
				<Steps current={step}>
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

const Question = ({ question }) => {
	const dispatch = useDispatch();
	const selectAnswer = (answer) => {
		setSelectedAnswer(answer);
		dispatch(
			updateSelectedAnswer({ selectedAnswer: answer, id: question.id })
		);
	};
	const [selectedAnswer, setSelectedAnswer] = React.useState(
		question.selectedAnswer
	);
	React.useEffect(() => {
		setSelectedAnswer(question.selectedAnswer);
	}, [question]);
	return (
		<>
			<p
				className="txt-dark-black txt-md md-btm"
				dangerouslySetInnerHTML={{ __html: question.currentQuestion }}
			/>
			<section className="questionGrid md-btm">
				{question.answers.map((answer) => (
					<div
						className={`question ${
							selectedAnswer === answer
								? "purp-bg"
								: "border-black"
						}`}
						key={answer}
						value={answer}
						onClick={() => {
							selectAnswer(answer);
						}}>
						<p
							className="txt-sm"
							dangerouslySetInnerHTML={{
								__html: answer
							}}
						/>
					</div>
				))}
			</section>
		</>
	);
};
