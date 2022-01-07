import React, {useState, useEffect} from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import {setQuestions} from "../store/quizSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'



export default function Home() {
	const [isLoading, setLoading] = React.useState(false);
	const [params, setParams] = useState({
		difficulty: "easy",
		category: 9,
		quizType: "multiple"
	});
	const updateParam = (param, value) => setParams(prevState => ({...prevState, [param]: value}))
	let fields = {
		quizTypes:  [
			{ label: "Multiple Choice", value: "multiple" },
			{ label: "True or False", value: "boolean" }
		],
		difficulties: [
			{ label: "Easy", value: "easy" },
			{ label: "Medium", value: "medium" },
			{ label: "Hard", value: "hard" }
		],
		categories: []
	}
	const dispatch = useDispatch();
	const router = useRouter();
	const errorDisplay = (msg) => toast.error(msg, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		progress: undefined,
	});
	const generate_quiz = async () => {
		await setLoading(true);
		const res = await fetch(`https://opentdb.com/api.php?amount=10&category=${params.category}&difficulty=${params.difficulty}&type=${params.quizType}`);
		const data = await res.json();
		if (data.response_code === 0) {
			let curatedList = [];
			for (const question of data.results) {
				let q = {
					id: uuidv4(),
					selectedAnswer: null,
					currentQuestion: question.question,
					correctAnswer: question.correct_answer,
					answers: [
						...question.incorrect_answers,
						question.correct_answer
					]
				};
				q.answers.sort(() => Math.random() - 0.5);
				curatedList.push(q);
			}
			dispatch(setQuestions(curatedList));
			await router.push({ pathname: `quiz`, query: { sessionID: uuidv4() } });
		} else {
			await setLoading(false);
			errorDisplay(
				"Hmm, looks like there isn't enough questions for your quiz."
			);
		}
	};

	useEffect(() => {
		fetch("https://opentdb.com/api_category.php")
			.then((res) => res.json())
			.then((data) => {
				data.trivia_categories.forEach((t) => {
					fields.categories.push({
						label: t.name,
						value: t.id
					});
				});

			})
			.catch((err) => errorDisplay(err.message));
	});

	return (
		<Layout>
			<section className="home mt-pad">
				<div className="container">
					<p className="txt-center md-btm txt-lg">
						Welcome to Quizzy!
					</p>
					<p className="txt-center txt-md md-btm">
						Choose from one of our 20+ categories and get your quiz on!
					</p>

					<div className="selector">
						<label className="txt-md">Select a Difficulty</label>
						<Select className={'txt-blk'} options={fields.difficulties} onChange={(e) => updateParam("difficulty", e.value)} />
					</div>
					<div className="selector">
						<label className="txt-md">Select a Quiz Type</label>
						<Select className={'txt-blk'} options={fields.quizTypes} onChange={(e) => updateParam("quizType", e.value)} />
					</div>
					<div className="selector">
						<label className="txt-md">Select a Category</label>
						<Select className={'txt-blk'} options={fields.categories} onChange={(e) => updateParam("category", e.value)} />
					</div>
					<button className="blu-bg" onClick={() => generate_quiz()}>
						{isLoading ? (
							"Generating Quiz..."
						) : (
							"Generate Quiz"
						)}
					</button>

				</div>
			</section>
			<ToastContainer />
		</Layout>
	);
}
