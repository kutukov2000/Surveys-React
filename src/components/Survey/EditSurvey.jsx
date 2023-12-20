import { Button, Input, Textarea } from '@nextui-org/react';
import useFetch from 'react-fetch-hook';
import { useParams } from 'react-router-dom';
import SurveyWithQuestions from './SurveyWithQuestions';
import SurveysService from '../Services/SurveysService';
import BackButton from './Helpers/BackButton';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toastOptions } from './Helpers/toastConfig';
import { useSelector } from 'react-redux';
import { selectToken } from '../../store/userSlice';
import LoadingIndicator from '../LoadingIndicator';

function EditSurvey() {

    //Get token
    const token = useSelector(selectToken);

    //Load survey data
    const { id } = useParams();
    const { isLoading, data: survey } = useFetch(`https://surveysapi.azurewebsites.net/api/Surveys/${id}`);

    //Loading Button
    const [isLoadingButton, setIsLoadingButton] = useState(false);

    //Form hook
    const { register, handleSubmit, formState: { errors }, } = useForm();

    //Put survey
    const onSubmit = async (updatedSurvey) => {

        setIsLoadingButton(true);

        const isUpdated = await SurveysService.putSurvey(id, updatedSurvey, token);
        switch (isUpdated) {
            case true: toast.success("Successfully updated!"); break;
            case false:
            default: toast.error("Error. Check data");
        }

        setIsLoadingButton(false);
    };

    if (isLoading) {
        return (
            <LoadingIndicator />
        );
    }

    return (
        <div className="m-3">
            <BackButton />
            <div className="d-flex flex-column align-items-center mt-3">
                <form className="w-45" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        {...register('title', { required: 'Title is required' })}
                        label="Title"
                        labelPlacement="outside"
                        type='text'
                        variant="bordered"
                        defaultValue={survey.title}
                        className="mb-3" />
                    {errors.title && <p style={{ color: '#cc4137' }}>{errors.title.message}</p>}

                    <Textarea
                        {...register('description')}
                        label="Description"
                        labelPlacement="outside"
                        variant="bordered"
                        defaultValue={survey.description}
                        className="mb-3" />
                    <div className='d-flex justify-content-end'>
                        <Button type="submit" color="primary" isLoading={isLoadingButton}>
                            {isLoadingButton ? 'Updating' : 'Update'}
                        </Button>
                    </div>
                </form>
                <SurveyWithQuestions survey={survey} />
                <Toaster toastOptions={toastOptions} />
            </div>
        </div>
    );
}

export default EditSurvey;