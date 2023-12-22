import Question from "../Question/Question";
import useFetch from "react-fetch-hook";
import { useParams } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import AnswersService from "../Services/AnswersService";
import BackButton from "./Helpers/BackButton";
import { toastOptions } from "./Helpers/toastConfig";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";
import { selectToken } from "../../store/userSlice";
import LoadingIndicator from "../LoadingIndicator";

function Survey() {

    //Get token
    const token = useSelector(selectToken);

    //Load survey data
    const { id } = useParams();
    const { isLoading, data: survey } = useFetch(`https://surveysapi.azurewebsites.net/api/Surveys/${id}`);

    //Answers
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

    async function postAnswers() {

        await AnswersService.postAnswers(answers,token);

        toast.success("We save your answer!");
    }

    if (isLoading) {
        return (
            <LoadingIndicator/>
        );
    }

    return (
        <div className="m-3">
            <BackButton />
            <div className="d-flex justify-content-center w-100 mb-3">
                <div className="d-flex flex-column">
                    <h1 className="fs-3 fw-semibold m-0 mb-3 text-center">{survey.title}</h1>
                    <p>{survey.description}</p>
                    <div className="d-flex flex-column gap-3 mb-3 mt-3">
                        {survey.questions.$values.map(question => (
                            <Question key={question.id} question={question} onAnswerSelected={handleAnswerChanged} />
                        ))}
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button onClick={postAnswers} color="primary">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
            <Toaster toastOptions={toastOptions} />
        </div>
    );
}

export default Survey;