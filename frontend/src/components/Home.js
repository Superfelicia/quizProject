const Home = ({startQuiz}) => {
    return (
        <>
            <div className='home-content'>
                <h1>SuperQuiz</h1>
                <p>Try your luck!</p>
                <button className='start-btn' onClick={startQuiz}>Start Quiz</button>
            </div>
        </>
    )
}

export default Home;