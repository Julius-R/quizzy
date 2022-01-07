import Layout from "../components/Layout";
import React, {useState} from "react";
import { useRouter } from "next/router";
import { resetState} from "../store/quizSlice";
import {useSelector, useDispatch} from "react-redux";

export default function Home() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [showWrong, setShowWrong] = useState(false);
    const wrongAnswers = useSelector(state => state.quiz.wrong)
    const returnHome = () => {
        dispatch(resetState());
        router.push({ pathname: `/`});
    }
    const displayResultsMessage = score => {
        let numberRight = 10 - score;
        let total = `${numberRight} out of 10 questions correct.`;
        switch(true) {
            case numberRight === 0:
                return `Yikes, you missed all the questions... You should try again.`;
            case numberRight > 0 &&numberRight <= 4:
                return `You got ${total} I recommend studying a bit more and trying again.`;
            case numberRight >= 5 && numberRight < 8:
                return `You got ${total} Not bad!`;
            case numberRight >= 8 && numberRight < 10:
                return `You got ${total} So close to a perfect score!`;
            case numberRight === 10:
                return `You got ${total} Dynamite!`;
            default:
                return `You got ${total}`;
        }
    }

     return (
        <Layout>
            <section className="results mt-pad">
                <div className="container">
                    <div className="results">
                        <p className="txt-center txt-lg">Results</p>
                        <p className="txt-center txt-md md-btm">{displayResultsMessage(wrongAnswers.length)}</p>
                    </div>
                    <div className="options md-btm">
                        {wrongAnswers.length > 0 && <button className="blu-bg" onClick={() => setShowWrong(!showWrong)}>View Wrong</button>}
                        {" "}<button className="blu-bg" onClick={() => returnHome()}>New Quiz</button>
                    </div>
                    {showWrong === true ? (
                        <div className="wrong">
                            <p className="txt-center txt-lg md-btm">Wrong Answers</p>
                            {wrongAnswers.map(answer => (
                                <div className="question txt-md md-btm" key={answer.id}>
                                    <p
                                        className="txt-md"
                                        dangerouslySetInnerHTML={{
                                            __html: `Question: ${answer.currentQuestion}`
                                        }}
                                    />
                                    <p
                                        className="txt-md"
                                        dangerouslySetInnerHTML={{
                                            __html: `Correct: ${answer.correctAnswer}</p>`
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : null}

                </div>
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
