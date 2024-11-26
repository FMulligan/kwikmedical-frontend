import React from 'react';

const AmbulanceTable = ({ records }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Patient Name</th>
                    <th>NHS Number</th>
                    <th>Address</th>
                    <th>Medical Condition</th>
                    <th>Call Out Time</th>
                    <th>Hospital Id</th>
                </tr>
            </thead>
            <tbody>
                {records.length ? (
                    records.map((record, index) => (
                        <tr key={index}>
                            <td>{record.patient_name || "Unknown"}</td>
                            <td>{record.nhs_number || "N/A"}</td>
                            <td>{record.address || "Unknown"}</td>
                            <td>{record.medical_condition || "N/A"}</td>
                            <td>{record.call_out_time || new Date().toLocaleString()}</td>
                            <td>{record.hospital_id || "Unknown"}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="no-records">No Ambulance Request Found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default AmbulanceTable;