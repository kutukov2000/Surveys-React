import '../Styles/SurveyWithQuastions.css'
import EditQuestion from "../Question/EditQuestion";

function SurveyWithQuestions({survey}) {

  return (
    <div className="d-flex justify-content-center w-100 mb-2 mt-3">
      <div className="d-flex flex-column">
        <div className="d-flex flex-column gap-3 mb-3">
          {survey.questions.$values.map(question => (
            <EditQuestion key={question.id} question={question}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SurveyWithQuestions;