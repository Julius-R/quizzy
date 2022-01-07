import React from 'react';
import { useDispatch } from "react-redux";
import { updateSelectedAnswer } from "../store/quizSlice";

export default function Question({question, currentStep}) {
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
        <section className="question-area mt-pad">
            <div className="question-box">
                <p
                    className="question txt-md"
                    dangerouslySetInnerHTML={{ __html: question.currentQuestion }}
                />
                <p className="question-number txt-md">Question #{currentStep + 1} of 10</p>
            </div>

            <section className="answers">
                {question.answers.map((answer) => (
                    <div
                        className={`answer ${answer === selectedAnswer ? "selected" : ""}`}
                        key={answer}
                        value={answer}
                        onClick={() => selectAnswer(answer)}
                       >
                        <p
                            className="txt-sm"
                            dangerouslySetInnerHTML={{
                                __html: answer
                            }}
                        />
                    </div>
                ))}
            </section>

        </section>
    );
}
