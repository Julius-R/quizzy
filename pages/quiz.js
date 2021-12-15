import Layout from "../components/Layout";
import React from "react";
import { useSelector } from "react-redux";

export default function quiz() {
	const quiz = useSelector((state) => state.quiz);
	return <Layout>{console.log(quiz)}</Layout>;
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

	// Pass data to the page via props
	// return { props: { data } };
}

/*
import Layout from "../components/Layout";
import React from "react";
import { Steps, Panel, Paragraph, Button, ButtonGroup } from "rsuite";

export default function Home() {
	const [step, setStep] = React.useState(0);
	const onChange = (nextStep) => {
		setStep(nextStep < 0 ? 0 : nextStep > 9 ? 0 : nextStep);
	};
	const [name, setName] = React.useState("");
	const onNext = () => onChange(step + 1);
	const onPrevious = () => onChange(step - 1);

	const activeComponent = [
		<Rap setName={setName} name={name} key={0} />,
		<HipHop setName={setName} name={name} key={1} />,
		<RnB key={2} />,
		<Jazz key={3} />
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
					<Steps.Item />
					<Steps.Item />
					<Steps.Item />
					<Steps.Item />
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
					<Button onClick={onNext} disabled={step === 9}>
						Next
					</Button>
				</ButtonGroup>
			
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

const Rap = ({setName, name}) => <input value={name} onChange={(e) => {setName(e.target.value)}}/>;

const HipHop = ({setName, name}) => <input value={name} onChange={(e) => {setName(e.target.value)}}/>;
const RnB = () => <p>RnB</p>;
const Jazz = () => <p>Jazz</p>;
*/
