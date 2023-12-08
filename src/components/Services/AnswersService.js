export default class AnswersService {

    static async getByQuestionId(questionId) {
        const response = await fetch(`https://surveysapi.azurewebsites.net/api/Answers/byQuestionId?questionId=${questionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.json();
    }

    static async postAnswer(answer) {
        await fetch('https://surveysapi.azurewebsites.net/api/Answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answer)
        });
    }

    static async postAnswers(answers) {
        answers.forEach(async (answer) => await AnswersService.postAnswer(answer));
    }

    static async deleteByQuestionId(questionId) {
        try {
            const response = await fetch(`https://surveysapi.azurewebsites.net/api/Answers/byQuestionId?questionId=${questionId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
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