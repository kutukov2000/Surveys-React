import SurveysList from "./components/Survey/SurveysList";
import Layout from "./components/Layout"
import { Routes, Route }  from "react-router-dom";
import AddSurvey from "./components/Survey/AddSurvey";
import EditSurvey from "./components/Survey/EditSurvey";
import Survey from "./components/Survey/Survey";
import SurveyResult from "./components/Survey/SurveyResult";
import { useSelector } from "react-redux";
import { selectUser } from "./store/userSlice";

function App() {

  const user=useSelector(selectUser);

  console.log(user);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<SurveysList/>} />
          <Route path='/surveys/:id' element={<Survey/>} />
          <Route path='/surveys/add' element={<AddSurvey/>} />
          <Route path='/survey/edit/:id' element={<EditSurvey/>} />
          <Route path='/survey/result/:id' element={<SurveyResult/>} />
          <Route path='*' element={<p>Page Not Found!</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
