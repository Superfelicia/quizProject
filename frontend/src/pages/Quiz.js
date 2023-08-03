import {useState, useEffect} from "react";

const Quiz = () => {
    const url = 'http://localhost:3001'
    const [questions, setQuestions] = useState()

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


    return (
        <div className="display-container">

        </div>
    )
}
export default Quiz;
