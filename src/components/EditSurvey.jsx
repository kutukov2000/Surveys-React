import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditSurvey() {
    const { surveyId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    useEffect(() => {
        // Fetch survey data based on surveyId when the component mounts
        // Replace 'your-api-endpoint' with the actual URL of your API endpoint for fetching survey data
        fetch(`your-api-endpoint/${surveyId}`)
            .then(response => response.json())
            .then(data => {
                // Set the form data with the retrieved survey data
                setFormData({
                    title: data.title,
                    description: data.description,
                });
            })
            .catch(error => {
                console.error('Error fetching survey data:', error);
            });
    }, [surveyId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send updated formData to your server for survey editing
        fetch(`your-api-endpoint/${surveyId}`, {
            method: 'PUT', // Assuming your API supports updating surveys with a PUT request
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                console.log('Survey updated successfully:', data);
            })
            .catch(error => {
                console.error('Error updating survey:', error);
            });
    };

    return (
        <div className="d-flex justify-content-center mt-3">
            <form className="w-40" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );
}

export default EditSurvey;
