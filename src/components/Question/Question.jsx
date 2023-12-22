import { Card, CardHeader, CardBody, Divider, Input } from "@nextui-org/react";
import { CheckboxGroup, Checkbox, RadioGroup, Radio } from "@nextui-org/react";

function Question({ question, onAnswerSelected }) {

    function setVariants() {
        switch (question.type) {
            case 1:
                return (
                    <RadioGroup>
                        {question.variants.$values.map(({ id, text: variantText }) => (
                            <Radio value={variantText}
                                   key={id}
                                   onChange={(event) => onAnswerSelected(question.id, event.target.value)}
                                   onFocus={(event) => onAnswerSelected(question.id, event.target.value)}>
                                   {variantText}
                            </Radio>
                        ))}
                    </RadioGroup>
                );
            case 2:
                return (
                    <CheckboxGroup>
                        {question.variants.$values.map(({ id, text: variantText }) => (
                            <Checkbox value={variantText}
                                      key={id}
                                      onChange={(event) => onAnswerSelected(question.id, event.target.value)}
                                      onFocus={(event) => onAnswerSelected(question.id, event.target.value)}>
                                      {variantText}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                );
            case 3:
                return <Input type='date'
                              variant="bordered"
                              onChange={(event) => onAnswerSelected(question.id, event.target.value)}
                              onFocus={(event) => onAnswerSelected(question.id, event.target.value)} />;
            case 0:
            default:
                return <Input type='text'
                              variant="bordered"
                              onChange={(event) => onAnswerSelected(question.id, event.target.value)}
                              onFocus={(event) => onAnswerSelected(question.id, event.target.value)} />;
        }
    }

    return (
        <Card className="w-45">
            <CardHeader>
                <h5>{question.text}</h5>
            </CardHeader>
            <Divider />
            <CardBody>
                <div>{setVariants()}</div>
            </CardBody>
        </Card>
    );
}

export default Question;
