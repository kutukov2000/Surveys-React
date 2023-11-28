import { Button, Input, Spinner } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import useFetch from 'react-fetch-hook';
import { useParams } from 'react-router-dom';

function EditSurvey() {
    const { id } = useParams();
    console.log(`SurveyId = ${id}`);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const { isLoading, data } = useFetch(`https://localhost:7258/api/Surveys/${id}`);
    
    useEffect(() => {
        if (!isLoading && data) {
            setFormData({
                title: data.title,
                description: data.description,
            });
        }
    }, [isLoading, data]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <Spinner size="lg" />
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form with formData:', formData);
    
        try {
            const response = await fetch(`https://localhost:7258/api/Surveys/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            console.log('Response from server:', response);
    
            if (response.ok) {
                const responseData = await response.json();
                console.log('Survey updated successfully:', responseData);
            } else {
                console.error('Error updating survey:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating survey:', error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center mt-3">
            <form className="w-40" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <Input
                        type='text'
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
                <Button type="submit" color='primary'>
                    Update
                </Button>
            </form>
        </div>
    );
}

export default EditSurvey;
