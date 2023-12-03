export default class VariantsService{
    static async postVariant(questionId, variantText) {
        const variant = {
            "text": variantText,
            "questionId": questionId
        }

        await fetch('https://surveysapi.azurewebsites.net/api/Variants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(variant)
        });

        console.log(variant);
    }

    static async deleteByQuestionId(questionId){
        try {
            const response = await fetch(`https://surveysapi.azurewebsites.net/api/Variants/byQuestionId?questionId=${questionId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
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