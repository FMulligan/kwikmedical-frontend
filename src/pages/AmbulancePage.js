import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AmbulanceTable from '../components/AmbulanceTable';
import AmbulanceForm from '../components/AmbulanceForm';
import '../App.css';

const AmbulancePage = () => {
    const { id } = useParams();
    const [records, setRecords] = useState([]);
    const websocketRef = useRef(null);
    const retryAttemptsRef = useRef(0);
    const initializedRef = useRef(false);
    const maxRetries = 3;

    const handleFormSubmit = (data) => {
        const payload = {
            id: records[0].id? records[0].id : "",
            nhs_number: records[0].nhs_number? records[0].nhs_number : "",
            assessment: data.assessment,
            accident_date_time: data.dateTime,
            call_out_location: data.location,
            action_taken: data.actionTaken,
            arrival_time: data.arrivalTime,
            departure_time: data.departureTime,
            ambulance_id: Number(id)
        };

        const apiEndpoint = "https://f1r1slj1f9.execute-api.eu-west-1.amazonaws.com/dev/Ambulance"
        fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        .then((response) => response.json())
        .then((data) => alert(data.body))
        .catch((error) => console.error('Error:', error));

        setRecords([]);    
    };

    const initializeWebSocket = () => {
        if (websocketRef.current) {
            console.warn("WebSocket is already initialized. Skipping reinitialization.");
            return;
        }
        const websocketUrl = `wss://kd5zrc0ivf.execute-api.eu-west-1.amazonaws.com/dev?ambulanceId=${id}`;
        const websocket = new WebSocket(websocketUrl);
        websocketRef.current = websocket;

        websocket.onopen = () => {
            console.log("WebSocket connection established.");
            retryAttemptsRef.current = 0;
        };

        websocket.onmessage = (event) => {
            console.log("Message received from WebSocket:", event.data);
            const data = JSON.parse(event.data);
            setRecords((prev) => [...prev, data]);
        };

        websocket.onclose = (event) => {
            console.warn("WebSocket connection closed:", event.reason);
            websocketRef.current = null;

            if (retryAttemptsRef.current < maxRetries) {
                retryAttemptsRef.current++;
                console.log(`Reconnection attempt ${retryAttemptsRef.current}/${maxRetries}`);
                setTimeout(initializeWebSocket, 5000);
            } else {
                console.error("Max reconnection attempts reached. Could not reconnect to WebSocket.");
            }
        };

        websocket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

    };

    useEffect(() => {
        if (initializedRef.current) {
            return;
        }

        initializedRef.current = true;
        initializeWebSocket();

        return () => {
            if (websocketRef.current) {
                websocketRef.current.close();
                websocketRef.current = null;
            }
        };
    }, []);

    return (
        <div className="container">
            <h1>Patient & Hospital Information</h1>
            <AmbulanceTable records={records} />
            <h1>Call Out Information</h1>
            <AmbulanceForm onSubmit={handleFormSubmit} />
        </div>
    );
};

export default AmbulancePage;