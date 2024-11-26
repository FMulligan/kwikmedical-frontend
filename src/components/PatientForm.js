import React, { useState, useEffect } from 'react';

const PatientForm = ({ onSubmit, selectedPatient }) => {
    const [patientData, setPatientData] = useState({
        name: '',
        nhs_number: '',
        address: '',
        medical_condition: '',
    });

    useEffect(() => {
        if (selectedPatient) {
            setPatientData(selectedPatient);
        }
    }, [selectedPatient]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPatientData({ ...patientData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(patientData);
        setPatientData({
            name: '',
            nhs_number: '',
            address: '',
            medical_condition: '', 
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Patient Details</h2>
            <div>
                <label htmlFor="name">Patient Name</label>
                <input
                    type="text"
                    id="name"
                    value={patientData.name}
                    onChange={handleChange}
                    placeholder="Patient Name"
                />
            </div>
            <div>
                <label htmlFor="nhs_number">NHS Registration Number</label>
                <input
                    type="text"
                    id="nhs_number"
                    value={patientData.nhs_number}
                    onChange={handleChange}
                    placeholder="NHS Registration Number"
                />
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    value={patientData.address}
                    onChange={handleChange}
                    placeholder="Address"
                />
            </div>
            <div>
                <label htmlFor="medical_condition">Medical Condition</label>
                <input
                    type="text"
                    id="medical_condition"
                    value={patientData.medical_condition}
                    onChange={handleChange}
                    placeholder="Enter medical condition"
                />
            </div>
            <button type="submit" className='button'>Submit</button>
        </form>
    );
};

export default PatientForm;