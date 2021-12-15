import Layout from "../components/Layout";
import React from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { setQuestions, setSessionID } from "../store/reducers";
import { Message, toaster, Form, Loader, SelectPicker } from "rsuite";

export default function Home() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [category, setCategory] = React.useState(9);
	const [quizType, setType] = React.useState("multiple");
	const [difficulty, setDifficulty] = React.useState("easy");
	const [isLoading, setLoading] = React.useState(false);

	const quizTypes = [
		{
			label: "Multiple Choice",
			value: "multiple"
		},
		{
			label: "True or False",
			value: "boolean"
		}
	];
	const difficulties = [
		{ label: "Easy", value: "easy" },
		{ label: "Medium", value: "medium" },
		{ label: "Hard", value: "hard" }
	];
	const [categories, setCategories] = React.useState([]);

	const generate_quiz = async () => {
		setLoading(true);
		const res = await fetch(
			`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${quizType}`
		);
		const data = await res.json();
		if (data.response_code === 0) {
			let curatedList = [];
			let sessionID = uuidv4();
			for (const question of data.results) {
				let q = {
					id: uuidv4(),
					selectedAnswer: null,
					currentQuestion: question.question,
					correctAnswer: question.correct_answer,
					answers: [...question.incorrect_answers]
				};
				q.answers.sort(() => Math.random() - 0.5);
				curatedList.push(q);
			}
			dispatch(setQuestions(curatedList));
			dispatch(setSessionID(sessionID));
			router.push({ pathname: `quiz`, query: { id: sessionID } });
		} else {
			setLoading(false);
			errorDisplay(
				"Hmm, looks like there isn't enough questions for your quiz. Try a different category or difficulty."
			);
		}
	};

	const errorDisplay = (msg) =>
		toaster.push(
			<Message
				duration={0}
				showIcon
				type="error"
				header="An Error Has Occurred"
				closable>
				{msg}
			</Message>,
			{
				placement: "topEnd"
			}
		);

	React.useEffect(() => {
		fetch("https://opentdb.com/api_category.php")
			.then((res) => res.json())
			.then((data) => {
				let cats = [];
				data.trivia_categories.forEach((t) => {
					cats.push({
						label: t.name,
						value: t.id
					});
				});
				setCategories(cats);
			})
			.catch((err) => errorDisplay(err.message));
	}, []);

	return (
		<Layout>
			<section className="home-view">
				<p className="txt-center txt-dark-black txt-lg">
					Welcome to <span className="txt-purple">Quizzy</span>!
				</p>
				<p className="txt-center txt-dark-black txt-md md-btm">
					Choose from one of our 20+ categories and get your quiz on!
				</p>

				<Form fluid>
					<Form.Group controlId="Categories">
						<Form.ControlLabel className="txt-sm">
							Categories:
						</Form.ControlLabel>
						<Form.Control
							onChange={(val) => setCategory(val)}
							block
							name="Categories"
							accepter={SelectPicker}
							data={categories}
							placeholder="Categories"
						/>
					</Form.Group>
					<Form.Group controlId="Quiz Type">
						<Form.ControlLabel className="txt-sm">
							Quiz Type:
						</Form.ControlLabel>
						<Form.Control
							onChange={(val) => setType(val)}
							block
							name="Quiz Type"
							accepter={SelectPicker}
							data={quizTypes}
							placeholder="Quiz Type"
						/>
					</Form.Group>
					<Form.Group controlId="Difficulty">
						<Form.ControlLabel className="txt-sm">
							Difficulty:
						</Form.ControlLabel>
						<Form.Control
							onChange={(val) => setDifficulty(val)}
							block
							name="Difficulty"
							accepter={SelectPicker}
							data={difficulties}
							placeholder="Difficulty"
						/>
					</Form.Group>
					<button className="purp-bg" onClick={() => generate_quiz()}>
						{isLoading ? (
							<Loader content="Generating Quiz..." />
						) : (
							"Generate Quiz"
						)}
					</button>
				</Form>
			</section>
		</Layout>
	);
}
