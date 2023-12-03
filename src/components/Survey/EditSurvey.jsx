import { Button, Input, Spinner, Textarea } from '@nextui-org/react';
import useFetch from 'react-fetch-hook';
import { useParams } from 'react-router-dom';
import SurveyWithQuestions from './SurveyWithQuestions';
import SurveysService from '../Services/SurveysService';
import BackButton from './Helpers/BackButton';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toastOptions } from './Helpers/toastConfig';

function EditSurvey() {

    //Load survey data
    const { id } = useParams();
    const { isLoading, data: survey } = useFetch(`https://localhost:7258/api/Surveys/${id}`);

    //Loading Button
    const [isLoadingButton, setIsLoadingButton] = useState(false);

    //Form hook
    const { register, handleSubmit, formState: { errors }, } = useForm();

    //Put survey
    const onSubmit = async (updatedSurvey) => {

        setIsLoadingButton(true);

        const isUpdated = await SurveysService.putSurvey(id, updatedSurvey);
        switch (isUpdated) {
            case true: toast.success("Successfully updated!"); break;
            case false:
            default: toast.error("Error. Check data");
        }

        setIsLoadingButton(false);
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="m-3">
            <BackButton />
            <div className="d-flex flex-column align-items-center mt-3">
                <form className="w-40" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <Input
                            {...register('title', { required: 'Title is required' })}
                            label="Title"
                            labelPlacement="outside"
                            type='text'
                            variant="bordered"
                            defaultValue={survey.title} />
                        {errors.title && <p style={{ color: '#cc4137' }}>{errors.title.message}</p>}
                    </div>
                    <div className="mb-3">
                        <Textarea
                            {...register('description')}
                            label="Description"
                            labelPlacement="outside"
                            variant="bordered"
                            defaultValue={survey.description} />
                    </div>
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