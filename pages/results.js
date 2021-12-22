import Layout from "../components/Layout";
import React from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {setQuestions, setSessionID, updateSelectedAnswer} from "../store/reducers";
import {Message, toaster, Form, Loader, SelectPicker, ButtonGroup, Button} from "rsuite";

export default function Home() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [step, setStep] = React.useState(0);
    const onChange = (nextStep) => {
        setStep(nextStep < 0 ? 0 : nextStep > 9 ? 0 : nextStep);
    };
    const onNext = () => onChange(step + 1);
    const onPrev = () => onChange(step - 1);


    const wrongAnswers = useSelector(state => state.quiz.wrong)
    const displayResultsMessage = score => {
        let numberRight = 10 - score;
        let total = `${numberRight} out of 10 questions correct.`;
        console.log(numberRight);
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

    /* TODO
    *
    *
    * Give option to take new quiz
    * Reset appropriate fields to achieve this
    *
    * */

    return (
        <Layout>
            <section className="quiz-view">
                <p className="txt-center txt-dark-black txt-lg">
                    Results
                </p>
                <p className="txt-center txt-dark-black txt-md md-btm">
                    {displayResultsMessage(0)}
                </p>
                <hr />
                <p className="txt-dark-black txt-md">Correct Answers:</p>
                <Question question={wrongAnswers[step]} arrLength={wrongAnswers.length}/>
                <ButtonGroup>
                    <Button onClick={onPrev} disabled={step === wrongAnswers.length}>
                        Prev
                    </Button>
                        <Button onClick={onNext} disabled={step === wrongAnswers.length}>Next</Button>
                    <Button onClick={onNext} disabled={step === wrongAnswers.length}>Try a new quiz</Button>

                </ButtonGroup>

            </section>
        </Layout>
    );
}

const Question = ({ question, arrLength }) => {
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
    const highlightChoice = answer => {
        switch(answer) {
            case question.selectedAnswer:
                return "border-wrong";
            case question.correctAnswer:
                return "border-correct";
            default:
                return "border-black";
        }
    }
    React.useEffect(() => {
        setSelectedAnswer(question.selectedAnswer);
    }, [question]);
    return (
        <>
            <p
                className="txt-dark-black txt-md md-btm"
                dangerouslySetInnerHTML={{ __html: question.currentQuestion }}
            />
            {arrLength}
            <section className="questionGrid md-btm">
                {question.answers.map((answer) => (
                    <div
                        className={`question ${highlightChoice(answer)}`}
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
