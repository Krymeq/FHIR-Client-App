import React from 'react';
import { removeNumbersFromString } from "../../utils";
import { Redirect, useHistory } from 'react-router-dom'

const PatientEntry = props => {
    const name = props.patient.resource.name[0];
    const birthDate = props.patient.resource.birthDate;
    return <div className = "patient-entry">
        <span className="name">
            { removeNumbersFromString(name.given[0] + " " + name.family) }
        </span>
        <span className="birth-date">
            { birthDate }
        </span>
    </div>
}

export default PatientEntry;