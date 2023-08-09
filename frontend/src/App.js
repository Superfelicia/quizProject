import './styles/style.css'
import Home from "./components/Home";

function App() {
  return (
    <div>
        <header className='main-header'>
            <a href='#' className='logo'>Quiz</a>
        </header>
        <Home/>
    </div>
  );
}

export default App;
