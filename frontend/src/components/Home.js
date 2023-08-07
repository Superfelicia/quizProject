import Quiz from "./Quiz";
import {useState} from "react";

const Home = () => {
    const [showQuiz, setShowQuiz] = useState(false)

    const startQuiz = () => {
        setShowQuiz(true)
    }

    return (
        <div className='home'>
            {!showQuiz ? (
                <div className='home-content'>
                    <h1>Quiz website</h1>
                    <p>Go to quiz</p>
                    <button className='start-btn' onClick={() => startQuiz()}>Start Quiz</button>
                </div>
            ) : (
                <div>
                    <Quiz/>
                </div>
            )}
        </div>
    )
}

export default Home;