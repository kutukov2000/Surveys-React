import React, { useState } from 'react';
import { Button, Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { toastOptions } from "./Helpers/toastConfig";
import SurveysService from "../Services/SurveysService";
import BackButton from "./Helpers/BackButton";
import { useSelector } from 'react-redux';
import { selectToken } from '../../store/userSlice';

function AddSurvey() {

  //Get token
  const token = useSelector(selectToken);

  //Loading Button
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //Form hook
  const { register, handleSubmit, formState: { errors }, } = useForm();

  //Post data
  const onSubmit = async (newSurvey) => {

    setIsLoadingButton(true);

    const isCreated = await SurveysService.postSurvey(newSurvey, token);
    switch (isCreated) {
      case true: toast.success("Successfully created!"); break;
      case false:
      default: toast.error("Error. Check data");
    }

    setIsLoadingButton(false);
  };

  return (
    <div className="m-3">
      <BackButton />
      <div className="d-flex justify-content-center mt-3">
        <form className="w-45" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('title', { required: 'Title is required' })}
            variant="bordered"
            label="Title"
            labelPlacement="outside"
            type="text"
            className="mb-3" />
          {errors.title && <p style={{ color: '#cc4137' }}>{errors.title.message}</p>}

          <Textarea
            {...register('description')}
            label="Description"
            labelPlacement="outside"
            variant="bordered"
            className='mb-3' />
          <div className='d-flex justify-content-end'>
            <Button type="submit" color="primary" isLoading={isLoadingButton}>
              {isLoadingButton ? 'Creating' : 'Create'}
            </Button>
          </div>
        </form>
        <Toaster toastOptions={toastOptions} />
      </div>
    </div>
  );
}

export default AddSurvey;
