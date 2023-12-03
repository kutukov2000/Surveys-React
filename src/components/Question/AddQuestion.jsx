import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input } from "@nextui-org/react";
import QuestionService from "../Services/QuestionsService";
import VariantsService from "../Services/VariantsService";
import QuestionTypes from "./Helpers/QuestionTypes";
import QuestionTypeDropdown from "./Helpers/QuestionTypeDropdown";
import EditableVariants from './Helpers/EditableVariants';
import { useForm } from 'react-hook-form';

function AddQuestion({ surveyId, onQuestionAdd }) {

  //Form hook
  const { register, handleSubmit, formState: { errors }, reset} = useForm();

  //Loading Button
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //Combobox    
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Text"]));
  const questionType = Array.from(selectedKeys).join(", ").replaceAll("_", " ");

  //Variants
  const [variants, setVariants] = useState([]);
  const addVariant = () => { setVariants([...variants, { text: "", id: variants.length }]); }
  const removeVariant = (id) => { setVariants(variants.filter((variant) => variant.id !== id)); };

  const handleVariantChange = (variantId, newText) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === variantId ? { ...variant, text: newText } : variant
      )
    );
  };

  const onSubmit = async (data) => {
    const question = {
      "text": data.title,
      "type": QuestionTypes.getTypeByText(questionType),
      "surveyId": surveyId
    }

    setIsLoadingButton(true);

    const createdQuestionId = await QuestionService.postQuestion(question);

    variants.forEach(async (variant) => await VariantsService.postVariant(createdQuestionId, variant.text));

    setIsLoadingButton(false);
    const newQuestion = {
      id: createdQuestionId,
      text: data.title,
      type: QuestionTypes.getTypeByText(questionType),
      variants: { $values: variants }
    };

    onQuestionAdd(newQuestion);

    reset();
    setVariants([]);
  }

  return (
    <Card className="w-40">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className='flex-column align-items-start gap-3'>
          <Input
            {...register('title', { required: 'Question title is required' })}
            type="text"
            label="Create Question"
            labelPlacement="outside"
            size="lg"
            color="success" />
          {errors.title && <p style={{ color: '#cc4137' }}>{errors.title.message}</p>}
          <QuestionTypeDropdown selectedKeys={selectedKeys} selectedValue={questionType} setSelectedKeys={setSelectedKeys} />
        </CardHeader>
        <Divider />
        <CardBody>
          <EditableVariants
            questionType={questionType}
            variants={variants}
            addVariant={addVariant}
            removeVariant={removeVariant}
            handleVariantChange={handleVariantChange} />
        </CardBody>
        <Divider />
        <CardFooter className="d-flex justify-content-end">
          <Button type="submit" className="text-light" color="success" isLoading={isLoadingButton}>
              {isLoadingButton ? 'Creating' : 'Create Question'}
            </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default AddQuestion;
