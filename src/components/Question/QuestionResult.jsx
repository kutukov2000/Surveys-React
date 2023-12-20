import { Card, CardHeader, CardBody, Divider, Listbox, ListboxItem } from "@nextui-org/react";
import useFetch from "react-fetch-hook";
import { useState, useEffect } from "react";
import LoadingIndicator from "../LoadingIndicator";

function QuestionResult({ id: questionId, text }) {

    //Load Answers
    const { isLoading, data: answers } = useFetch(`https://surveysapi.azurewebsites.net/api/Answers/byQuestionId?questionIdid=${questionId}`);

    //Show only unique answers
    const [uniqueAnswers, setUniqueAnswers] = useState([]);
    useEffect(() => {
        if (!isLoading && answers) {
            const uniqueAnswersSet = new Set(answers.$values.map(({ text }) => text));
            setUniqueAnswers(Array.from(uniqueAnswersSet));
        }
    }, [isLoading, answers]);

    //Answer percentage
    const calculatePercentage = (answer) => {
        const occurrences = answers.$values.filter(({ text }) => text === answer).length;
        const totalAnswers = answers.$values.length;
        return ((occurrences / totalAnswers) * 100).toFixed(2);
    };

    if (isLoading) {
        return (
            <LoadingIndicator/>
        );
    }

    return (
        <Card className="w-45">
            <CardHeader>
                <h5>{text}</h5>
            </CardHeader>
            <Divider />
            <CardBody>
                <Listbox color="primary" variant="shadow">
                    {uniqueAnswers.map((answer) => (
                        <ListboxItem key={answer} variant="bordered" disabled>
                            <div className="d-flex gap-3 justify-content-between">
                                <span>{`${answer}`}</span>
                                <span>{calculatePercentage(answer) + '%'}</span>
                            </div>
                        </ListboxItem>
                    ))}
                </Listbox>
            </CardBody>
        </Card>
    );
}

export default QuestionResult;
