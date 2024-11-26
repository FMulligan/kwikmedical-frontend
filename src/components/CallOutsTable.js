import React from 'react';

const CallOutsTable = ({ filteredRecords, publishToSNS }) => {
    return (
        <>
            {filteredRecords.length ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>NHS Number</th>
                            <th>Address</th>
                            <th>Medical Condition</th>
                            <th>Assessment</th>
                            <th>Accident Date & Time</th>
                            <th>Location</th>
                            <th>Action Taken</th>
                            <th>Arrival Time</th>
                            <th>Departure Time</th>
                            <th>Publish Ambulance Request</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.map((record, index) => (
                            <tr key={index}>
                                <td>{record.PatientName || 'N/A'}</td>
                                <td>{record.nhs_number || 'N/A'}</td>
                                <td>{record.Address || 'N/A'}</td>
                                <td>{record.medical_condition || 'N/A'}</td>
                                <td>{record.assessment || 'N/A'}</td>
                                <td>{record.accident_date_time || 'N/A'}</td>
                                <td>{record.call_out_location || 'N/A'}</td>
                                <td>{record.action_taken || 'N/A'}</td>
                                <td>{record.arrival_time || 'N/A'}</td>
                                <td>{record.departure_time || 'N/A'}</td>
                                <td>
                                    <button className="button" onClick={() => publishToSNS(record)}>Publish</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-records">No records found</div>
            )}
        </>
    );
};

export default CallOutsTable;