import Question from "./Question";
import useFetch from "react-fetch-hook";
import { useParams } from "react-router-dom";
import { Button, Spinner } from "@nextui-org/react";
import { useState } from "react";
import './Styles/SurveyWithQuastions.css'

function Survey() {
    const { id } = useParams();
    const { isLoading, data } = useFetch(`https://localhost:7258/api/Surveys/${id}`);
    
    const [answers, setAnswers] = useState([]);

    const handleAnswerChanged = (questionId, answer) => {
        const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);
    
        if (existingAnswerIndex !== -1) {
          const updatedAnswers = [...answers];
          updatedAnswers.splice(existingAnswerIndex, 1);
          setAnswers(updatedAnswers);
        }
    
        const newAnswer = { questionId, text: answer };
        setAnswers(prevAnswers => [...prevAnswers, newAnswer]);
      };
    
      const handleAnswerSelected = (questionId, answer) => {
        console.log(`Question ${questionId} selected answer: ${answer}`);
        console.log(answers);
        handleAnswerChanged(questionId, answer);
      };

    function log(){
        console.log(answers);
    }
        // const newAnswer = {
        //     "text": answersText,
        //     "questionId": questionId
        // };

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
                <h1 className="fs-3 fw-semibold">{survey.title}</h1>
                <p>{survey.description}</p>
                <div className="questions d-flex gap-3 mb-3">
                    {survey.questions.$values.map(question => (
                        <Question key={question.id} id={question.id} text={question.text} variants={question.variants} questionType={question.type} onAnswerSelected={handleAnswerSelected} />
                    ))}
                </div>
                <div className="d-flex justify-content-end">
                    <Button onClick={log} color="primary">Submit answers</Button>
                </div>
            </div>
        </div>
    );
}

export default Survey;