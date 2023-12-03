import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input, Tooltip } from "@nextui-org/react";
import { useMemo, useState } from 'react';
import QuestionService from "../Services/QuestionsService";
import VariantsService from "../Services/VariantsService";
import QuestionTypes from "./Helpers/QuestionTypes";
import QuestionTypeDropdown from "./Helpers/QuestionTypeDropdown";
import EditableVariants from "./Helpers/EditableVariants";
import { useForm } from "react-hook-form";

function EditQuestion({ question, onDelete }) {

    //Form hook
    const { register, handleSubmit, formState: { errors } } = useForm();

    //Loading Button
    const [isLoadingButton, setIsLoadingButton] = useState(false);

    //Combobox 
    const [selectedKeys, setSelectedKeys] = useState(new Set([QuestionTypes.getTypeByNumber(question.type)]));
    const questionType = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const handleQuestionDelete = async () => {
        await QuestionService.deleteQuestion(question.id);
        onDelete(question.id);
    };

    //Variants
    const [variants, setVariants] = useState(question.variants.$values);
    const addVariant = () => { setVariants([...variants, { text: "", id: variants.length }]); console.log(variants); }
    const removeVariant = (variantId) => { setVariants(variants.filter((variant) => variant.id !== variantId)); };
    const handleVariantChange = (variantId, newText) => {
        setVariants((prevVariants) =>
            prevVariants.map((variant) =>
                variant.id === variantId ? { ...variant, text: newText } : variant
            )
        );
    };

    const putQuestionWithVariants = async (title) => {

        // Put Question {text, type}
        await QuestionService.putQuestion(question.id, { "text": title, "type": QuestionTypes.getTypeByText(questionType) })

        // Remove old variants by questionId
        await VariantsService.deleteByQuestionId(question.id);

        //Add new variants
        variants.forEach((variant) => VariantsService.postVariant(question.id, variant.text));
    }

    const onSubmit = async (data) => {

        setIsLoadingButton(true);

        await putQuestionWithVariants(data.title);

        setIsLoadingButton(false);
    }

    return (
        <Card className="w-40">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader className='flex-column align-items-start gap-3'>
                    <div className="d-flex justify-content-between align-items-center gap-2 w-100">
                        <Input
                            {...register('title', { required: 'Question title is required' })}
                            type="text"
                            label="Question"
                            labelPlacement="outside"
                            color="primary"
                            size="lg"
                            defaultValue={question.text} />
                        <Tooltip content="Remove Question" color="danger">
                            <Button onClick={handleQuestionDelete}
                                isIconOnly
                                size="lg"
                                variant="light">❌</Button>
                        </Tooltip>
                    </div>
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
                    <Button type="submit" className="text-light" color="primary" variant="shadow" isLoading={isLoadingButton}>
                        {isLoadingButton ? 'Saving' : 'Save'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}

export default EditQuestion;