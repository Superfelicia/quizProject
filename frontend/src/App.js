import './styles/style.css'
import Quiz from "./components/Quiz";
import Home from "./components/Home";

function App() {
  return (
    <div>
        <header className='main-header'>
            <a href='#' className='logo'>Quiz</a>
        </header>
        <Home/>
      {/*<Quiz/>*/}
    </div>
  );
}

export default App;
