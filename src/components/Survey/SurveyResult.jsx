import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { toastOptions } from "./Helpers/toastConfig";
import useFetch from "react-fetch-hook";
import BackButton from "./Helpers/BackButton";
import QuestionResult from "../Question/QuestionResult";
import LoadingIndicator from "../LoadingIndicator";

function SurveyResult(){

    //Load survey data
    const { id } = useParams();
    const { isLoading, data:survey } = useFetch(`https://surveysapi.azurewebsites.net/api/Surveys/${id}`);

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
                            <QuestionResult key={question.id} id={question.id} text={question.text} />
                        ))}
                    </div>
                </div>
            </div>
            <Toaster toastOptions={toastOptions} />
        </div>
    );
}

export default SurveyResult;