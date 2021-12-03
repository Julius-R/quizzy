import Layout from "../components/Layout";
import React from "react";
import { Steps, Panel, Paragraph, Button, ButtonGroup } from "rsuite";

export default function Home() {
	const [step, setStep] = React.useState(0);
	const onChange = (nextStep) => {
		setStep(nextStep < 0 ? 0 : nextStep > 2 ? 0 : nextStep);
	};
	const [name, setName] = React.useState("");
	const [catergory, setCatergory] = React.useState("");
	const [type, setType] = React.useState("");
	const [difficulty, setDifficulty] = React.useState("");
	
	const onNext = () => onChange(step + 1);
	const onPrevious = () => onChange(step - 1);

	const activeComponent = [
		<WelcomeScreen setName={setName} name={name} key={0} />,
		<HipHop setName={setName} name={name} key={1} />,
		<RnB key={2} />
	]
	
	return (
		<Layout title="Quizzy | A quiz app by Julius R.">
			<section className="home-view">
				<h1 className="txt-dark-black tx-lg tx-center">
					Welcome to Quizzy, {name}!
				</h1>
				<Steps current={step}>
					<Steps.Item />
					<Steps.Item />
					<Steps.Item />
				</Steps>
				<hr />
				<Panel header={`Step: ${step + 1}`}>
					{activeComponent[step]}
				</Panel>
				<hr />
				<ButtonGroup>
					<Button onClick={onPrevious} disabled={step === 0}>
						Back
					</Button>
					<Button onClick={onNext} disabled={step === 2}>
						Next
					</Button>
				</ButtonGroup>
			</section>
		</Layout>
	);
}

const WelcomeScreen = () => {
	return (
		<div>
			
		</div>
	);
};

const Rap = ({setName, name}) => <input value={name} onChange={(e) => {setName(e.target.value)}}/>;

const HipHop = ({setName, name}) => <input value={name} onChange={(e) => {setName(e.target.value)}}/>;
const RnB = () => <p>RnB</p>;
