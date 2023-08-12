import './styles/style.css'
import {useEffect, useState} from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";

function App() {
    const [showQuiz, setShowQuiz] = useState(false)
    const [quizSlide, setQuizSlide] = useState(false)
    const [questions, setQuestions] = useState([])

    const url = 'https://8267-82-196-111-182.ngrok-free.app'
    const headers = new Headers();
    headers.append('ngrok-skip-browser-warning', 'true');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(url + '/getQuestions', {headers});
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

    useEffect(() => {
        if (showQuiz) {
            setQuizSlide(true);
        } else {
            setQuizSlide(false);
        }
    }, [showQuiz]);


    const startQuiz = () => {
        setShowQuiz(true)
    }
    const backHome = () => {
        setShowQuiz(false)
    }

    return (
        <div className='home'>
            <header className='main-header'>
                <a href='#' className='logo'>SuperQuiz</a>
            </header>
            <Home startQuiz={startQuiz}/>
            {showQuiz && questions &&
                <Quiz questions={questions} showQuiz={showQuiz} backHome={backHome} quizSlide={quizSlide}/>}
        </div>
    );
}

export default App;
