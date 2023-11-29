import { Card, CardHeader, CardBody, Divider, Input } from "@nextui-org/react";
import { CheckboxGroup, Checkbox, RadioGroup, Radio } from "@nextui-org/react";

function Question({id: questionId, text, variants, questionType,onAnswerSelected }) {

    function setVariants() {
        switch (questionType) {
            case 0:
                return <Input type='text'
                              className='border border-primary'
                              onChange={(event) => onAnswerSelected(questionId, event.target.value)}
                              onFocus={(event) => onAnswerSelected(questionId, event.target.value)}/>;
            case 1:
                return (
                    <RadioGroup>
                        {variants.$values.map(({ id, text: variantText }) => (
                            <Radio value={variantText} 
                                   key={id}  
                                   onChange={(event) => onAnswerSelected(questionId, event.target.value)}
                                   onFocus={(event) => onAnswerSelected(questionId, event.target.value)}>
                                {variantText}
                            </Radio>
                        ))}
                    </RadioGroup>
                );
            case 2:
                return (
                    <CheckboxGroup>
                        {variants.$values.map(({ id, text: variantText }) => (
                            <Checkbox value={variantText} 
                            key={id}  
                            onChange={(event) => onAnswerSelected(questionId, event.target.value)}
                            onFocus={(event) => onAnswerSelected(questionId, event.target.value)}>
                                {variantText}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                );
            case 3:
                return <Input type='date'
                            className='border border-primary'
                            onChange={(event) => onAnswerSelected(questionId, event.target.value)}
                            onFocus={(event) => onAnswerSelected(questionId, event.target.value)}/>;
            default:
                return null;
        }
    }

    return (
        <Card className="w-40">
            <CardHeader>
                <h5>{text}</h5>
            </CardHeader>
            <Divider />
            <CardBody>
                <div>{setVariants()}</div>
            </CardBody>
        </Card>
    );
}

export default Question;
