import Layout from "../components/Layout";
import Question from "../components/Question";
import React from "react";
import { useRouter } from "next/router";
import {useSelector} from "react-redux";
import { ButtonGroup, Button} from "rsuite";

export default function Home() {
    const router = useRouter();
    const [step, setStep] = React.useState(0);
    const onNext = () => setStep(step + 1);
    const onPrev = () => setStep(step - 1);


    const wrongAnswers = useSelector(state => state.quiz.wrong)
    const returnHome = () => {

        router.push({ pathname: `/`});
    }
    const displayResultsMessage = score => {
        let numberRight = 10 - score;
        let total = `${numberRight} out of 10 questions correct.`;
        switch(true) {
            case 0:
                return `Yikes, you missed all the questions... You should try again.`;
            case numberRight <= 4:
                return `You got ${total} I recommend studying a bit more and trying again.`;
            case numberRight >= 5 && numberRight < 8:
                return `You got ${total} Not bad!`;
            case numberRight >= 8 && numberRight < 10:
                return `You got ${total} So close to a perfect score!`;
            case 10:
                return `You got ${total} Dynamite!`;
            default:
                return `You got ${total}`;
        }
    }

     return (
        <Layout>
            <section className="quiz-view">
                <p className="txt-center txt-dark-black txt-lg">Results</p>
                <p className="txt-center txt-dark-black txt-md md-btm">{displayResultsMessage(wrongAnswers.length)}</p>
                <hr />
                <p className="txt-dark-black txt-md">Correct Answers:</p>
                <Question question={wrongAnswers[step]} isResult={true}/>
                <ButtonGroup>
                    <Button onClick={onPrev} disabled={step === 0}>Prev</Button>
                    <Button onClick={onNext} disabled={step === wrongAnswers.length - 1}>Next</Button>
                    <Button onClick={returnHome}>Try a new quiz</Button>
                </ButtonGroup>

            </section>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    if (ctx.query.quizComplete === false) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }
    return { props: {} };
}
