import { Link } from 'react-router-dom';
function Survey(survey) {

    return (
        <div className="card w-25">
            <div className="card-body">
                <h5 className="card-title">{survey.title}</h5>
                <p className="card-text">{survey.description}</p>
                <Link to={`questions/${survey.id}`}><button className="btn btn-primary">Take a survey</button></Link>
                <Link to={`survey/${survey.id}/edit`}><button className="btn btn-warning">Edit survey</button></Link>
            </div>
        </div>
    );
}

export default Survey;