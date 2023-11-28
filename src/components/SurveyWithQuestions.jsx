import AddQuestion from "./AddQuestion";
import Question from "./Question";
import useFetch from "react-fetch-hook";
import { useParams } from "react-router-dom";
import { Button, Spinner } from "@nextui-org/react";
import { useState } from "react";
import './Styles/SurveyWithQuastions.css'

function SurveyWithQuestions() {
  const { id } = useParams();
  const { isLoading, data } = useFetch(`https://localhost:7258/api/Surveys/${id}`);

  const [answers, setAnswers] = useState([]);

  const addAnswer = (questionId, answerText) => {
    const existingAnswerIndex = answers.findIndex(answer => answer.questionId === questionId);

    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = { questionId: questionId, text: [answerText] };
      setAnswers(updatedAnswers);
    }
    else {
      const newAnswer = { questionId, text: [answerText] };
      setAnswers([...answers, newAnswer]);
    }
  };

  const logg = () => {
    console.log(answers);
    pushData();
  }

  const pushData = () => {
    const apiEndpoint = 'https://localhost:7258/api/Answers';

    answers.forEach(answer => {
      fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answer),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  }

  const handleAnswerSelected = (questionId, answer) => {
    console.log(`Question ${questionId} selected answer: ${answer}`);
    addAnswer(questionId, answer);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100 w-100">
        <Spinner size="lg" />
      </div>
    );
  }

  const survey = data ? data : null;
  console.log(`SurveyId = ${survey.id}`)
  return (
    <div className="d-flex justify-content-center w-100 mb-2">
      <div className="d-flex flex-column">
        <h1>{survey.title}</h1>
        <p>{survey.description}</p>
        <div className="questions d-flex gap-3 mb-3">
          {survey.questions.$values.map(question => (
            <Question key={question.id} id={question.id} text={question.text} variants={question.variants} questionType={question.type} onAnswerSelected={handleAnswerSelected} />
          ))}
        </div>
        <div className="d-flex justify-content-end">
          <Button onClick={logg} color="primary">Submit</Button>
        </div>
        <AddQuestion surveyId={survey.id}/>
      </div>
    </div>
  );
}

export default SurveyWithQuestions;