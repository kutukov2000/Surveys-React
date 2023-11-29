export default class QuestionService{

    static async putQuestion(id,question){

        console.log('Question:', question);

        try {
            const response = await fetch(`https://localhost:7258/api/Questions/${id}`, {
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
        await fetch(`https://localhost:7258/api/Questions/${id}`, {
            method: 'DELETE',
        });

        window.location.reload();
    };
}