import React from 'react';
import { useDispatch } from "react-redux";
import { updateSelectedAnswer } from "../store/reducers";

export default function Question({question, isResult}) {
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
    const addQuizStyle = answer => {
        if(selectedAnswer === answer) {
            return "purp-bg";
        } else {
            return "border-black";
        }
    }
    const addSkillStyle = answer => {
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
            <section className="questionGrid md-btm">
                {question.answers.map((answer) => (
                    <div
                        className={`question ${
                            isResult ? addSkillStyle(answer) : addQuizStyle(answer)
                        }`}
                        key={answer}
                        value={answer}
                        onClick={() => {
                            if(!isResult) {
                                selectAnswer(answer);
                            }
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
}

