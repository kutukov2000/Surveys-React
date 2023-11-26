import useFetch from "react-fetch-hook";
import Survey from "./Survey";
import { Link } from 'react-router-dom';
function Surveys() {

  const { isLoading, data } = useFetch("https://localhost:7258/api/Surveys");
  console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const surveys = data ? data.$values : [];

  return (
    <div className='d-flex flex-column w-100 align-items-center gap-2 mt-2'>
      {surveys.map(survey => (
        <Survey key={survey.id} id={survey.id} title={survey.title} description={survey.description} />
      ))}
      <Link to={`surveys/add`} className="w-25 mb-2">
        <button className="btn btn-success w-100">
          Add new
        </button>
      </Link>
    </div>
  );
}

export default Surveys;
