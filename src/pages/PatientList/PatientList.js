import React, { useState, useEffect } from 'react';
import { serverURL, appURL } from '../../config';
import PatientEntry from './PatientEntry';
import { Link } from 'react-router-dom';
import './PatientList.scss';

const PatientList = () =>{
    const [patients, setPatients] = useState([]);
    const [nextPage, setNextPage] = useState("");
    const [prevPage, setPrevPage] = useState("");
    const [url, setURL] = useState(`${serverURL}/Patient`);

    const handleResponse = res => {
        const next = res.link.find(e => e.relation === "next");
        const prev = res.link.find(e => e.relation === "previous");
        setPatients(res.entry);
        setNextPage(!!next ? next.url : "");
        setPrevPage(!!prev ? prev.url : "");
    }
    
    useEffect(() => {
        const fetchPatientsFromURL = url => {
            fetch(url)
            .then(res => res.json())
            .then(res => handleResponse(res));
        }

        fetchPatientsFromURL(url)
    }, [url]);

    const tableRows = patients.map(
        patient => 
        <Link to={`/patient/${patient.resource.id}`}>
            <PatientEntry
                key={patient.resource.id} 
                patient={patient}
            />
        </Link>)

    return (
    <div className="patient-page">
        <header>
            <span>
                patient list
            </span>
        </header>
        <main>
            <div className="patient-list">
                <div className="table-header">
                    <span className="name">
                        Name
                    </span>
                    <span className="birth-date">
                        Date of birth
                    </span>
                </div>
                {tableRows}
            </div>
        </main>
        <div className="nav-buttons">
            {prevPage !== "" ? <button onClick={() => setURL(prevPage)}>Previous</button> : ""}
            {nextPage !== "" ? <button onClick={() => setURL(nextPage)}>Next</button> : ""}
        </div>
    </div>); 
}

export default PatientList;