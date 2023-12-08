export default class VariantsService {

    static surveyApiURL = 'https://surveysapi.azurewebsites.net/api/Variants';

    static async postVariant(questionId, variantText, token) {
        const variant = {
            "text": variantText,
            "questionId": questionId
        }

        await fetch(this.surveyApiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(variant)
        });

        console.log(variant);
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
                console.log('Variants deleted successfully');
            } else {
                console.error('Error deleting variants:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting variants:', error.message);
        }
    }
}