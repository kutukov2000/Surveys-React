import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input } from "@nextui-org/react";
import { CheckboxGroup, Checkbox, RadioGroup, Radio } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useMemo, useState } from 'react';

function AddQuestion(surveyId) {

    //Combobox 
    const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    //Question
    const [title, setTitle] = useState();
    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
    }

    //Variants
    const [variants, setVariants] = useState([]);
    const addVariant = () => {
        setVariants([...variants, { text: "", id: variants.length }]);
    }
    const removeVariant = (variantId) => {
        setVariants(variants.filter((variant) => variant.id !== variantId));
    };
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
                return (
                    <div>
                        <RadioGroup>
                            {variants.map(({ text: variantText, id }, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center gap-2">
                                    <Radio value='' isDisabled={true} key={id}/>
                                    <Input className="w-100" 
                                        size='sm'
                                        type="text"
                                        value={variantText}
                                        onChange={(e) => handleVariantChange(id, e.target.value)}/>
                                    <Button onClick={() => removeVariant(id)} isIconOnly >❌</Button>
                                </div>
                            ))}
                        </RadioGroup>
                        <Button className="mt-3" onClick={addVariant}>Add variant</Button>
                    </div>
                );
            case 'CheckBox':
                return (
                    <div>
                        <CheckboxGroup>
                            {variants.map(({ text: variantText, id }, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center gap-2">
                                    <Checkbox key={id} isDisabled={true}/>
                                    <Input className="w-100" 
                                        size='sm'
                                        type="text"
                                        value={variantText}
                                        onChange={(e) => handleVariantChange(id, e.target.value)}/>
                                    <Button onClick={() => removeVariant(id)} isIconOnly >❌</Button>
                                </div>
                            ))}
                        </CheckboxGroup>
                        <Button className="mt-3" onClick={addVariant}>Add variant</Button>
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

    async function postVariant(text, questionId) {
        const variant = {
            "text": text,
            "questionId": questionId
        }
        await fetch('https://localhost:7258/api/Variants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(variant)
        });

        console.log(variant);
    }

    const PostQuestionWithVariants = async () => {
        const question = {
            "text": title,
            "type": getType(),
            "surveyId": surveyId.surveyId
        }

        const response = await fetch('https://localhost:7258/api/Questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(question)
        });

        const createdQuestionId = await response.json();

        variants.forEach((variant) => postVariant(variant.text, createdQuestionId));
    }

    return (
        <Card className="w-40">
            <CardHeader className='flex-column align-items-start gap-3'>
                <Input type="text" 
                       label="Question" 
                       color="primary"
                       onChange={(e) => handleTitleChange(e.target.value)} />
                <div className='d-flex align-items-center gap-2'>
                    <p className='fs-5 h-100'>Type:</p>
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
                <Button className="text-light" onClick={PostQuestionWithVariants} color="success">
                    Add Question
                </Button>
            </CardFooter>
        </Card>
    );
}

export default AddQuestion;
