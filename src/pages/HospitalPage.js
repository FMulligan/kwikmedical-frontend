import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CallOutsTable from '../components/CallOutsTable';
import '../App.css';

const HospitalPage = () => {
    const { id } = useParams();
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchField, setSearchField] = useState('');

    useEffect(() => {
        fetchRecords();
    }, []);

    useEffect(() => {
        const filtered = records.filter(record => {
            const name = (record.PatientName || '').toLowerCase();
            const nhsNumber = (String(record.nhs_number) || '').toLowerCase(); 
            const searchQuery = searchField.toLowerCase();
    
            return name.includes(searchQuery) || nhsNumber.includes(searchQuery);
        });
    
        setFilteredRecords(filtered);
    }, [searchField, records]);

    const fetchRecords = async () => {
        const apiEndpoint = `https://f1r1slj1f9.execute-api.eu-west-1.amazonaws.com/dev/CallOuts?hospitalId=${id}`;
        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP error Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Data fetched:", data);

            if (data && data.Items) {
                setRecords(data.Items);
                setFilteredRecords(data.Items);
            } else {
                console.warn("No Items in response:", data);
                setRecords([]);
            }
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchField(e.target.value);
    };

    const publishToSNS = async (record) => {
        const data = {
            id: record.id,
            nhs_number: record.nhs_number,
            medical_condition: record.medical_condition,
            patient_name: record.PatientName,
            address: record.Address,
            callOut_date_time: record.callOut_date_time,
            hospital_id: record.hospital_id,
        };

        const apiEndpoint = 'https://f1r1slj1f9.execute-api.eu-west-1.amazonaws.com/dev/CallOuts';
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert('CallOut published to SNS successfully!');
            } else {
                alert('Failed to publish CallOut to SNS');
            }
        } catch (error) {
            console.error('Error publishing to SNS:', error);
            alert('Error publishing to SNS');
        }
    };

    return (
        <div className="container">
            <h1>Search Patient Records</h1>
            <SearchBar searchField={searchField} onSearchChange={handleSearchChange} />
            <h1>Ambulance Call-Outs</h1>
            <CallOutsTable filteredRecords={filteredRecords} publishToSNS={publishToSNS}/>
        </div>
    );
};
export default HospitalPage;