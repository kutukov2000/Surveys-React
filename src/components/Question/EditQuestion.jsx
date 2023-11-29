import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input, Tooltip } from "@nextui-org/react";
import { CheckboxGroup, Checkbox, RadioGroup, Radio } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useMemo, useState } from 'react';
import QuestionService from "../QuestionsService";
import VariantsService from "../VariantsService";

function EditQuestion({ question }) {
    //Combobox 
    const [selectedKeys, setSelectedKeys] = useState(new Set([getTypeByNumber()]));
    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    //Question
    const [title, setTitle] = useState(question.text);
    const handleTitleChange = (newTitle) => { setTitle(newTitle); }

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

    function SetVariantsType() {
        switch (selectedValue) {
            case 'RadioButton':
            case 1:
                return (
                    <div>
                        <RadioGroup>
                            {variants.map(({ id, text: variatText }, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center gap-2">
                                    <Radio value='' isDisabled={true} key={id} />
                                    <Input className="w-100"
                                        size='sm'
                                        type="text"
                                        value={variatText}
                                        onChange={(e) => handleVariantChange(id, e.target.value)} />
                                    <Button onClick={() => removeVariant(id)} isIconOnly >❌</Button>
                                </div>
                            ))}
                        </RadioGroup>
                        <Button className="mt-3" onClick={addVariant} variant="ghost" size="sm">Add variant</Button>
                    </div>
                );
            case 'CheckBox':
            case 2:
                return (
                    <div>
                        <CheckboxGroup>
                            {variants.map(({ text: variantText, id }, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center gap-2">
                                    <Checkbox key={id} isDisabled={true} />
                                    <Input className="w-100"
                                        size='sm'
                                        type="text"
                                        value={variantText}
                                        onChange={(e) => handleVariantChange(id, e.target.value)} />
                                    <Button onClick={() => removeVariant(id)} isIconOnly >❌</Button>
                                </div>
                            ))}
                        </CheckboxGroup>
                        <Button className="mt-3" onClick={addVariant} variant="ghost" size="sm">Add variant</Button>
                    </div>
                );
            default:
                return null;
        }
    }

    function getType() {
        switch (selectedValue) {
            case 'Text': return 0;
            case 'RadioButton': return 1;
            case 'CheckBox': return 2;
            case 'Date': return 3;
            default: return null;
        }
    }

    function getTypeByNumber() {
        switch (question.type) {
            case 0: return 'Text';
            case 1: return 'RadioButton';
            case 2: return 'CheckBox';
            case 3: return 'Date';
            default: return null;
        }
    }

    // async function postVariant(text) {
    //     const variant = {
    //         "text": text,
    //         "questionId": question.id
    //     }

    //     await fetch('https://localhost:7258/api/Variants', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(variant)
    //     });

    //     console.log(variant);
    // }

    // const removeOldVariants = async () => {
    //     try {
    //         const response = await fetch(`https://localhost:7258/api/Variants/byQuestionId?questionId=${question.id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (response.ok) {
    //             console.log('Variants deleted successfully');
    //         } else {
    //             console.error('Error deleting variants:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error deleting variants:', error.message);
    //     }
    // }

    const postQuestionWithVariants = async () => {
        // putQuestion();
        await QuestionService.putQuestion(question.id,{"text": title, "type": getType()})

        // removeOldVariants();
        await VariantsService.deleteByQuestionId(question.id);

        variants.forEach((variant) => VariantsService.postVariant(question.id,variant.text));
    }

    // const deleteQuestion = async () => {
    //     await fetch(`https://localhost:7258/api/Questions/${question.id}`, {
    //         method: 'DELETE',
    //     });

    //     window.location.reload();
    // };

    // const putQuestion = async () => {
    //     const updatedQuestion = {
    //         "text": title,
    //         "type": getType()
    //     }

    //     console.log('Submitting form with formData:', updatedQuestion);

    //     try {
    //         const response = await fetch(`https://localhost:7258/api/Questions/${question.id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(updatedQuestion),
    //         });

    //         console.log('Response from server:', response);

    //         if (response.ok) {
    //             const responseData = await response.json();
    //             console.log('Question updated successfully:', responseData);
    //         } else {
    //             console.error('Error updating question:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error updating question:', error.message);
    //     }
    // };

    return (
        <Card className="w-40">
            <CardHeader className='flex-column align-items-start gap-3'>
                <div className="d-flex justify-content-between align-items-center gap-2 w-100">
                    <Input type="text"
                        label="Question"
                        labelPlacement="outside"
                        color="primary"
                        size="lg"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)} />
                    <Tooltip content="Remove Question" color="danger">
                        <Button onClick={() => QuestionService.deleteQuestion(question.id)} 
                                isIconOnly 
                                size="lg" 
                                variant="light">❌</Button>
                    </Tooltip>
                </div>
                <div className='d-flex align-items-center gap-2'>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                className="capitalize">
                                {selectedValue}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedKeys}>
                            <DropdownItem key="Text">Text</DropdownItem>
                            <DropdownItem key="RadioButton">RadioButton</DropdownItem>
                            <DropdownItem key="CheckBox">CheckBox</DropdownItem>
                            <DropdownItem key="Date">Date</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                {SetVariantsType()}
            </CardBody>
            <Divider />
            <CardFooter className="d-flex justify-content-end">
                <Button className="text-light" color="primary" variant="shadow" onClick={postQuestionWithVariants}>
                    Save
                </Button>
            </CardFooter>
        </Card>
    );
}

export default EditQuestion;
