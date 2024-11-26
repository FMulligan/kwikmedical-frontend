import React, { useState } from 'react';

const AmbulanceForm = ({ onSubmit }) => {
    const [assessment, setAssessment] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [location, setLocation] = useState('');
    const [actionTaken, setActionTaken] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [departureTime, setDepartureTime] = useState('');

    const recordTime = (setTime) => {
        const currentTime = new Date().toLocaleString();
        setTime(currentTime);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            assessment,
            dateTime,
            location,
            actionTaken,
            arrivalTime,
            departureTime,
        });
        setAssessment('');
        setDateTime('');
        setLocation('');
        setActionTaken('');
        setArrivalTime('');
        setDepartureTime('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="assessment">Assessment (What)</label>
                <input
                    type="text"
                    id="assessment"
                    value={assessment}
                    onChange={(e) => setAssessment(e.target.value)}
                    placeholder="Enter assessment"
                    required
                />
            </div>
            <div>
                <label htmlFor="datetime">Date & Time (When)</label>
                <input
                    type="datetime-local"
                    id="datetime"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="location">Location (Where)</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                    required
                />
            </div>
            <div>
                <label htmlFor="action_taken">Action Taken</label>
                <textarea
                    id="action_taken"
                    value={actionTaken}
                    onChange={(e) => setActionTaken(e.target.value)}
                    placeholder="Describe actions taken"
                    required
                />
            </div>
            <div className="button-group">
                <button type="button" className="arrival-btn" onClick={() => recordTime(setArrivalTime)}>Arrival Time</button>
                <div className="timestamp">{arrivalTime ? `Time: ${arrivalTime}` : ''}</div>
            </div>
            <div className="button-group">
                <button type="button" className="departure-btn" onClick={() => recordTime(setDepartureTime)}>Departure Time</button>
                <div className="timestamp">{departureTime ? `Time: ${departureTime}` : ''}</div>
            </div>
            <button type="submit" className="button">Submit</button>
        </form>
    );
};

export default AmbulanceForm;