import Quiz from "./Quiz";
import {useState} from "react";

const Home = ({backHome}) => {
    const [showQuiz, setShowQuiz] = useState(false)

    const startQuiz = () => {
        setShowQuiz(true)
    }

    return (
        <div className='home'>
            {!backHome && (
                <div className='home-content'>
                    <h1>Quiz website</h1>
                    <p>Go to quiz</p>
                    <button className='start-btn' onClick={() => startQuiz()}>Start Quiz</button>
                </div>
            )}
            {showQuiz && <Quiz showQuiz={showQuiz}/>}
        </div>
    )
}

export default Home;