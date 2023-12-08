import AnswersService from "./AnswersService";
import VariantsService from "./VariantsService";

export default class QuestionService {

    static surveyApiURL = 'https://surveysapi.azurewebsites.net/api/Questions'

    static async postQuestion(question, token) {
        const response = await fetch(this.surveyApiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(question)
        });

        return await response.json();
    }

    static async putQuestion(id, question, token) {

        console.log('Question:', question);

        try {
            const response = await fetch(`${this.surveyApiURL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
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

    static async deleteQuestion(id, token) {
        await fetch(`${this.surveyApiURL}/${id}`, {
            method: 'DELETE',
            Authorization: `Bearer ${token}`
        });

        await VariantsService.deleteByQuestionId(id);
        await AnswersService.deleteByQuestionId(id);
    };
}