import React, { useState } from 'react'
import axios from 'axios'


const ItineraryForm = () => {
    const initialFormData = {
        tripName: '',
        startDate:'',
        endDate:'',
        people:'',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [formSuccess, setFormSuccess] = useState('');
    const [formErrors, setFormErrors] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            // send POST request
            await axios.post('http://localhost:8082/trip', formData);

            // HTTP req successful
            setFormSuccess('Data received correctly');

            // Reset form data
            setFormData(initialFormData);
        } catch(err) {
            handleErrors(err);
        }
    };

    const handleErrors = (err) => {
        if(err.response.data && err.response.data.errors) {
            // Handle validation errors
            const { errors } = err.response.data;

            let errorMsg = [];

            for(let error of errors) {
                const { msg } = error;

                errorMsg.push(msg);
            }
            
            setFormErrors(errorMsg);
        } else {
            // Handle generic error
            setFormErrors(['Oops, there was an error!']);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
        setFormErrors([]);
        setFormSuccess('');
    };

    return (
        <div className='ItineraryForm'>
            <form onSubmit={handleSubmit} className = 'form'>
                
                <fieldset>
                    <div>
                        <label>Start a new trip!</label>
                            <input 
                                type='text'
                                id='tripName'
                                class="input"
                                placeholder='trip to...'
                                value={formData.tripName}
                                onInput={handleChange}/>
                    </div>
                    {/* <div>
                        <label>Start Date</label>
                            <input
                                type='text'
                                id='startDate'
                                class="input"
                                placeholder='DD/MM/YYYY'
                                value={formData.startDate}
                                onInput={handleChange}/>
                    </div>
                    <div>
                        <label>End Date </label>
                            <input
                                type='text'
                                id='endDate'
                                class="input"
                                placeholder='DD/MM/YYYY'
                                value={formData.endDate}
                                onInput={handleChange}/>
                    </div> */}
                    {/* <div>
                        <label>People </label>
                            <textarea
                                type='text'
                                id='people'
                                class="input"
                                placeholder='going with...'
                                value={formData.people}
                                onInput={handleChange}/>
                    </div> */}
                    <button type="submit" onClick={handleSubmit}>
                        Create Trip
                    </button>
                </fieldset>
            </form>
        </div>
    )
}
export default ItineraryForm