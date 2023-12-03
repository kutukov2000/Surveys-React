export default class SurveysService {

    static async getSurveys(){
        const response= await fetch('https://surveysapi.azurewebsites.net/api/Surveys');

        return  await response.json();;
    }

    static async postSurvey(survey) {
        const response = await fetch('https://surveysapi.azurewebsites.net/api/Surveys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(survey),
        });

        console.log('Response from server:', response);

        return response.ok;
    }

    static async putSurvey(id, survey) {
        try {
            const response = await fetch(`https://surveysapi.azurewebsites.net/api/Surveys/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(survey),
            });

            console.log('Response from server:', response);

            return response.ok;

        } catch (error) {
            console.error('Error updating survey:', error.message);
        }
    }

    static async deleteSurvey(id) {
        await fetch(`https://surveysapi.azurewebsites.net/api/Surveys/${id}`, {
            method: 'DELETE',
        });

        window.location.reload();
    };
}