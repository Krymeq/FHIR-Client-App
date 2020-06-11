import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { serverURL } from '../../config';
import { removeNumbersFromString } from '../../utils';
import './PatientData.scss';

const PatientData = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(undefined);

    useEffect(() => {
        fetch(`${serverURL}/Patient/${id}`)
        .then(res => res.json())
        .then(res => setPatient(res));
    }, [id, patient])

    return (
    <div className="patient-data-root">
        <header>
            <span>
                {!patient ? "Loading..." 
                : `${removeNumbersFromString(`${patient.name[0].given} ${patient.name[0].family}`)}`}
            </span>
        </header>
        <main>
            
        </main>
    </div>)
}

export default PatientData;