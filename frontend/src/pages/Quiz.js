import {useState, useEffect} from "react";

const Quiz = () => {
    const url = 'http://localhost:3001'
    const [questions, setQuestions] = useState();
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [result, setResult] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(url + '/getQuestions');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error)
                return null
            }
        }
        //Anropa fetchQuestions direkt i useEffect och handle result
        (async () => {
            const dataQuestions = await fetchQuestions()
            if (dataQuestions !== null) {
                setQuestions(dataQuestions)
            }
        })()
    }, [])

    console.log(questions);

    //ändras när score state uppdateras
    useEffect(() => {
        console.log(score)
    }, [score])

    //Visa den aktuella frågan
    const renderQuestion = () => {
        if (activeQuestion >= questions?.length) {
            return 'No more questions';
        } else {
            return questions[activeQuestion].question;
        }
    }

    //visa nästa fråga om den aktiva frågan är mindre eller lika med questionsArray längden - 2
    //setActiveQuestion till prevActiveQuestion + 1
    // nextQuestionIndex är den aktiva frågan + 1
    const onClickNext = () => {
        if (activeQuestion <= questions?.length - 2) {
            setActiveQuestion(prevActiveQuestion => prevActiveQuestion + 1);
            const nextQuestionIndex = activeQuestion + 1;

            setActiveQuestion(nextQuestionIndex);
            setSelectedAnswer(null);
            setSelectedAnswerIndex(null);
        }
    }

    // Funktionen kallas när användaren väljer ett svar på en fråga
    const onSelectedAnswer = (answer, index) => {
        // uppdatera svaret i selectedAnswer och indexet för valda frågan
        setSelectedAnswer(answer);
        setSelectedAnswerIndex(index);

        //uppdatera result
        setResult(prevResult => ({
            ...prevResult,
            [questions[activeQuestion].id]: {
                answer: answer.trim(), //lägg till användarens val
                questionId: questions[activeQuestion].id, // lägg till questionId
            },
        }));
    }

    // När användaren klickar på "Finished"-knappen
    // avslutas quizet och postar svaren till servern
    const onFinishedClick = async () => {
        setQuizAnswers(null)
        setIsFinished(true)
        try {
            fetch(url + '/postQuizAnswers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    result,
                }),
            })
        } catch (error) {
            console.log('Error:', error)
        }
        //lägg till getQuizAnswers
    }

    //lägg till funktion för att räkna ihop score på varje fråga och lägg till i array
    //gå igenom array när result är satt


    //skapa en useEffect som körs varje gång result eller questions ändras
    // Kontrollera om både "result" och "questions" finns och inte är falska.
    // Uppdatera state-variabeln "score" med den nya poängen.


    // visas när onFinishedClick klickats.
    // visar score och rätt svar
    const quizIsFinished = () => {
        return (
            <>
                <div className="header">
                    <h4>End of quiz</h4>
                </div>
                <div className="question-container">
                    <span className="question">Score</span>
                    <p className='score-text'>{score} / 4</p>
                </div>
                <div>
                    {quizAnswers && (
                        <div>
                            <h5 className='score-answers score-text'>Quiz answers:</h5>
                            <ol className='answers-list score-text'>
                                {quizAnswers.map((answerData) => (
                                    <li key={answerData.questionId}>
                                        <p>
                                            {answerData.answer}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>
            </>
        );
    }

    return (
        <div className="display-container">
            {questions?.length > 0 &&
                <div>
                    {isFinished ? quizIsFinished() : (
                        <>
                            <div className="header">
                                <div>
                                    <h4>Quiz</h4>
                                </div>
                            </div>
                            <div className="question-container">
                                <span className="question">{renderQuestion()}</span>
                            </div>
                            <div className="container">
                                {
                                    questions[activeQuestion].option.split(',').map((el, index) => (
                                        <div id="option-container"
                                             onClick={() => onSelectedAnswer(el, index, selectedAnswer)}
                                             className={index === selectedAnswerIndex ? 'selected-answer' : null}
                                             key={index}>
                                            <div className='option-text'>
                                                {el}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <button className="next-button" disabled={selectedAnswerIndex === null}
                                    onClick={activeQuestion >= questions?.length - 1 ? onFinishedClick : onClickNext}>{activeQuestion === questions?.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        </>
                    )}
                </div>
            }
        </div>
    )
}
export default Quiz;
