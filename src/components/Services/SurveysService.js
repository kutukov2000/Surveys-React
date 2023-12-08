export default class SurveysService {

    static async getSurveys(){
        const response= await fetch('https://surveysapi.azurewebsites.net/api/Surveys');

        return  await response.json();;
    }

    static async postSurvey(survey,token) {
        const response = await fetch('https://localhost:7258/api/Surveys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(survey),
        });

        console.log('Response from server:', response);

        return response.ok;
    }

    static async putSurvey(id, survey,token) {
        try {
            const response = await fetch(`https://localhost:7258/api/Surveys/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(survey),
            });

            console.log('Response from server:', response);

            return response.ok;

        } catch (error) {
            console.error('Error updating survey:', error.message);
        }
    }

    static async deleteSurvey(id,token) {
        await fetch(`https://localhost:7258/api/Surveys/${id}`, {
            method: 'DELETE',
            Authorization: `Bearer ${token}`
        });

        window.location.reload();
    };
}