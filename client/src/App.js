import "./App.css";
import { Route, Routes } from 'react-router';
import MainPage from "./pages/MainPage";
import QuestionView from "./pages/QuestionView";
import AddQuestion from "./pages/AddQuestion";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/question/:qid" element={<QuestionView/>}/>
        <Route path="/addQuestion" element={<AddQuestion/>}/>
      </Routes>
    </div>
  );
}

export default App;
