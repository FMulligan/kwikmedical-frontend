import React from 'react';

const PatientTable = ({ records, onSelect }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Patient Name</th>
                    <th>NHS Number</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {records.length ? (
                    records.map((record, index) => (
                        <tr key={index}>
                            <td>{record.name}</td>
                            <td>{record.nhs_number}</td>
                            <td>{record.address}</td>
                            <td>
                                <button className="button" onClick={() => onSelect(record)}>Select</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="no-records">No records found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default PatientTable;