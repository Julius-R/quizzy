import Layout from "../components/Layout";
import React from "react";
import { Steps, Panel, Paragraph, Button, ButtonGroup } from "rsuite";

export default function Home() {
	const [step, setStep] = React.useState(0);
	const onChange = (nextStep) => {
		setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
	};

	const onNext = () => onChange(step + 1);
	const onPrevious = () => onChange(step - 1);

	const [activeComponent, setActiveComponent] = React.useState([
		<Rap key={0} />,
		<HipHop key={1} />,
		<RnB key={2} />,
		<Jazz key={3} />
	]);
	return (
		<Layout title="Quizzy | A quiz app by Julius R.">
			<section className="home-view">
				<h1 className="txt-dark-black tx-lg tx-center">
					Welcome to Quizzy!
				</h1>
				<Steps current={step}>
					<Steps.Item title="Step 1" />
					<Steps.Item title="Step the 2" />
					<Steps.Item title="Step up 3" />
					<Steps.Item title="Step down 4 what" />
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
					<Button onClick={onNext} disabled={step === 3}>
						Next
					</Button>
				</ButtonGroup>
				{/* <App /> */}
			</section>
		</Layout>
	);
}

const App = () => {
	const [step, setStep] = React.useState(0);
	const onChange = (nextStep) => {
		setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
	};

	const onNext = () => onChange(step + 1);
	const onPrevious = () => onChange(step - 1);

	const [activeComponent, setActiveComponent] = React.useState([
		<Rap key={0} />,
		<HipHop key={1} />,
		<RnB key={2} />,
		<Jazz key={3} />
	]);

	return (
		<div>
			<Steps current={step}>
				<Steps.Item title="Finished" description="Description" />
				<Steps.Item title="In Progress" description="Description" />
				<Steps.Item title="Waiting" description="Description" />
				<Steps.Item title="Waiting" description="Description" />
			</Steps>
			<hr />
			<Panel header={`Step: ${step + 1}`}>{activeComponent[step]}</Panel>
			<hr />
			<ButtonGroup>
				<Button onClick={onPrevious} disabled={step === 0}>
					Previousk
				</Button>
				<Button onClick={onNext} disabled={step === 3}>
					Next
				</Button>
			</ButtonGroup>
		</div>
	);
};

const Rap = () => <p>Rap</p>;
const HipHop = () => <p>HipHop</p>;
const RnB = () => <p>RnB</p>;
const Jazz = () => <p>Jazz</p>;
