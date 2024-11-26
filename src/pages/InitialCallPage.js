import React, { useState, useEffect } from 'react';
import '../App.css';

import SearchBar from '../components/SearchBar';
import PatientTable from '../components/PatientTable';
import PatientForm from '../components/PatientForm';

const InitialCallPage = () => {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState({});
    const [searchField, setSearchField] = useState('');

    useEffect(() => {
        fetchPatientDetails();
    }, []);

    useEffect(() => {
        const filtered = records.filter(record => {
            const name = (record.name || '').toLowerCase();
            const nhsNumber = (String(record.nhs_number) || '').toLowerCase();
            const searchQuery = searchField.toLowerCase();
    
            return name.includes(searchQuery) || nhsNumber.includes(searchQuery);
        });
    
        setFilteredRecords(filtered);
    }, [searchField, records]);

    const fetchPatientDetails = async () => {
        const apiEndpoint = "https://f1r1slj1f9.execute-api.eu-west-1.amazonaws.com/dev/Patients";
        try {
            const response = await fetch(apiEndpoint);
            const data = await response.json();
            const items = JSON.parse(data.body).Items;
            setRecords(items);
            setFilteredRecords(items);
        } catch (error) {
            console.error("Error fetching patient records:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
    };

    const handleFormSubmit = async (patientData) => {
        const apiEndpoint = "https://f1r1slj1f9.execute-api.eu-west-1.amazonaws.com/dev/InitialCall"
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(patientData),
            });
            const result = await response.json();
            alert(result.body);
            fetchPatientDetails();
        } catch (error) {
            console.error("Error submitting patient data:", error);
        }
    };

    return (
        <div className="container">
            <h1>Search and Manage Patient Records</h1>
            <SearchBar searchField={searchField} onSearchChange={handleSearchChange} />
            <PatientTable records={filteredRecords} onSelect={handleSelectPatient} />
            <PatientForm onSubmit={handleFormSubmit} selectedPatient={selectedPatient} />
        </div>
    );
};

export default InitialCallPage;