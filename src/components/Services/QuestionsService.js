import AnswersService from "./AnswersService";
import VariantsService from "./VariantsService";

export default class QuestionService{

    static async postQuestion(question){
        const response = await fetch('https://surveysapi.azurewebsites.net/api/Questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(question)
        });

        return await response.json();
    }

    static async putQuestion(id,question){

        console.log('Question:', question);

        try {
            const response = await fetch(`https://surveysapi.azurewebsites.net/api/Questions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(question),
            });

            console.log('Response from server:', response);

            if (response.ok) {
                const responseData = await response.json();
                console.log('Question updated successfully:', responseData);
            } else {
                console.error('Error updating question:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating question:', error.message);
        }
    };

    static async deleteQuestion(id){
        await fetch(`https://surveysapi.azurewebsites.net/api/Questions/${id}`, {
            method: 'DELETE',
        });

        await VariantsService.deleteByQuestionId(id);
        await AnswersService.deleteByQuestionId(id);
    };
}