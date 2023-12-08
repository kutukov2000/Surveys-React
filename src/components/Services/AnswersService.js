export default class AnswersService {

    static surveyApiURL = 'https://surveysapi.azurewebsites.net/api/Answers';

    static async getByQuestionId(questionId) {
        const response = await fetch(`${this.surveyApiURL}/byQuestionId?questionId=${questionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.json();
    }

    static async postAnswer(answer, token) {
        await fetch(`${this.surveyApiURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(answer)
        });
    }

    static async postAnswers(answers, token) {
        answers.forEach(async (answer) => await AnswersService.postAnswer(answer, token));
    }

    static async deleteByQuestionId(questionId, token) {
        try {
            const response = await fetch(`${this.surveyApiURL}/byQuestionId?questionId=${questionId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.ok) {
                console.log('Answers deleted successfully');
            } else {
                console.error('Error deleting answers:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting answers:', error.message);
        }
    }
}