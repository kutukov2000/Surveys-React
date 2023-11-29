import SurveysList from "./components/Survey/SurveysList";
import Layout from "./components/Layout"
import { Routes, Route }  from "react-router-dom";
import SurveyWithQuestions from "./components/Survey/SurveyWithQuestions";
import AddSurvey from "./components/Survey/AddSurvey";
import EditSurvey from "./components/Survey/EditSurvey";
import Survey from "./components/Survey/Survey";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<SurveysList/>} />
          <Route path='questions/:id' element={<SurveyWithQuestions/>} />
          <Route path='surveys/:id' element={<Survey/>} />
          <Route path='surveys/add' element={<AddSurvey/>} />
          <Route path='survey/edit/:id' element={<EditSurvey/>} />
          <Route path='*' element={<p>Page Not Found!</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
