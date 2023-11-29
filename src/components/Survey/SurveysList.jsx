import useFetch from "react-fetch-hook";
import SurveyCard from "./SurveyCard";
import { Link } from 'react-router-dom';
import { Button, Spinner } from "@nextui-org/react";

function SurveysList() {
  const { isLoading, data } = useFetch("https://localhost:7258/api/Surveys");
  const surveys = data?.["$values"] || [];

  const deleteSurvey = async (id) => {
    await fetch(`https://localhost:7258/api/Surveys/${id}`, {
      method: 'DELETE',
    });

    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100 w-100">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className='d-flex flex-column w-100 align-items-center gap-2 mt-2'>
      {surveys.map(survey => (
        <SurveyCard key={survey.id} survey={survey} onDelete={deleteSurvey}/>
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
