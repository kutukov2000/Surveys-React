import React, { useState } from 'react';
import { Button, Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { toastOptions } from "./Helpers/toastConfig";
import SurveysService from "../Services/SurveysService";
import BackButton from "./Helpers/BackButton";

function AddSurvey() {

  //Loading Button
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //Form hook
  const { register, handleSubmit, formState: { errors }, } = useForm();

  //Post data
  const onSubmit = async (newSurvey) => {

    setIsLoadingButton(true);

    const isCreated = await SurveysService.postSurvey(newSurvey);
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
        <form className="w-40" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Input
              {...register('title', { required: 'Title is required' })}
              variant="bordered"
              label="Title"
              labelPlacement="outside"
              type="text" />
            {errors.title && <p style={{ color: '#cc4137' }}>{errors.title.message}</p>}

          </div>
          <div className="mb-3">
            <Textarea
              {...register('description')}
              label="Description"
              labelPlacement="outside"
              variant="bordered" />
          </div>
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
