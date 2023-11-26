import useFetch from "react-fetch-hook";
import Question from "./Question";
import { useParams } from "react-router-dom";
import './Styles/SurveyWithQuastions.css'
function SurveyWithQuestions() {
  const { id } = useParams();
    
  const { isLoading, data } = useFetch(`https://localhost:7258/api/Surveys/${id}`);
  console.log(data);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const survey = data ? data : null;
  
  return (
    <div className="d-flex justify-content-center w-100 mb-2">
      <div className="d-flex flex-column">
        <h1>{survey.title}</h1>
        <p>{survey.description}</p>
        <div className="questions d-flex gap-3 mb-3">
          {survey.questions.$values.map(question => (
            <Question key={question.id} text={question.text} variants={question.variants} questionType={question.type} />
          ))}
        </div>
        <div className="d-flex justify-content-end"><button className="btn btn-primary w-25">Submit</button></div>
      </div>
    </div>
  );
}

export default SurveyWithQuestions;