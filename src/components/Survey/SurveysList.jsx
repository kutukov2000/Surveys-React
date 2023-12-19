import useFetch from "react-fetch-hook";
import SurveyCard from "./SurveyCard";
import { Link } from 'react-router-dom';
import { Button, Spinner } from "@nextui-org/react";
import SurveysService from "../Services/SurveysService";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/userSlice";
import { useEffect, useState } from "react";

function SurveysList() {

  //Get token
  const token = useSelector(selectToken);

  const [surveys, setSurveys] = useState([]);

  const { isLoading, data } = useFetch("https://surveysapi.azurewebsites.net/api/Surveys");

  useEffect(() => {
    if (data) {
      const surveysData = data["$values"] || [];
      setSurveys(surveysData);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100 w-100">
        <Spinner size="lg" />
      </div>
    );
  }

  const onDelete = async (id) => {
    await SurveysService.deleteSurvey(id, token);

    setSurveys(prevSurveys => prevSurveys.filter(survey => survey.id !== id));
  }

  return (
    <div className='d-flex flex-column w-100 align-items-center gap-2 mt-2'>
      {surveys.map(survey => (
        <SurveyCard key={survey.id} survey={survey} onDelete={() => onDelete(survey.id)} />
      ))}
      <Link to={`surveys/add`} className="w-25 mb-2">
        <Button color="success" className="w-100 text-light">
          Add new
        </Button>
      </Link>
    </div>
  );
}

export default SurveysList;