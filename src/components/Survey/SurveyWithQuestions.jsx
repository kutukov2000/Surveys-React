import EditQuestion from "../Question/EditQuestion";
import AddQuestion from '../Question/AddQuestion';
import { useState } from 'react';

function SurveyWithQuestions({ survey }) {
  const [questions, setQuestions] = useState(survey.questions.$values);

  const handleQuestionDelete = (questionId) => {
    const updatedQuestions = questions.filter(question => question.id !== questionId);
    setQuestions(updatedQuestions);
  };

  const handleQuestionAdd = (newQuestion) => {
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };

  return (
    <div className="d-flex flex-column gap-3 mb-3 mt-3">
      {questions.map(question => (
        <EditQuestion key={question.id} question={question} onDelete={handleQuestionDelete} />
      ))}
      <AddQuestion surveyId={survey.id} onQuestionAdd={handleQuestionAdd} />
    </div>
  );
}

export default SurveyWithQuestions;

