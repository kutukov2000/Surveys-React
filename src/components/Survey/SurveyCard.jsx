import { Button, Card, CardHeader, Divider, CardBody, CardFooter } from '@nextui-org/react';
import { Link } from 'react-router-dom';

function SurveyCard({ survey, onDelete }) {
    return (
        <Card className='w-45'>
            <CardHeader>
                <h5 className="fs-3 fw-semibold">{survey.title}</h5>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{survey.description}</p>
            </CardBody>
            <Divider />
            <CardFooter>
                <div className='d-flex gap-2'>
                    <Link to={`surveys/${survey.id}`}><Button color='primary'>Take a survey</Button></Link>
                    <Link to={`survey/result/${survey.id}`}><Button color='success' className='text-light'>Results</Button></Link>
                    <Link to={`survey/edit/${survey.id}`}><Button color='warning'>Edit survey</Button></Link>
                    <Button onClick={onDelete} color='danger'>Delete</Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default SurveyCard;