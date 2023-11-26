import Surveys from "./components/Surveys";
import Layout from "./components/Layout"
import { Routes, Route }  from "react-router-dom";
import SurveyWithQuestions from "./components/SurveyWithQuestions";
import AddSurvey from "./components/AddSurvey";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Surveys/>} />
          <Route path='questions/:id' element={<SurveyWithQuestions/>} />
          <Route path='surveys/add' element={<AddSurvey/>} />
          <Route path='survey/:id/edit' element={<AddSurvey/>} />
          <Route path='*' element={<p>Page Not Found!</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
