import React, { useState, useEffect } from 'react';
import MedRequest from './MedRequest';
import { useParams, Link } from 'react-router-dom';
import { serverURL } from '../../config';
import { removeNumbersFromString } from "../../utils";
import "./MedRequestList.scss";

const MedRequestList = props => {
    const { id } = useParams();
    const [observations, setObservations] = useState(null);
    const [subject, setSubject] = useState(null);

    useEffect(() => {
        fetch(`${serverURL}/MedicationRequest?subject=${id}`)
        .then(res => res.json())
        .then(res => 
            {   
                console.log(res.entry);
                setObservations(res.entry ? res.entry : [])
            });

        fetch(`${serverURL}/Patient/${id}`)
        .then(res => res.json())
        .then(res => setSubject(res));
    }, [id])

    const sortFunc = (a, b) => {
        const dateA = new Date(a.resource.authoredOn).getTime();
        const dateB = new Date(b.resource.authoredOn).getTime();

        if (dateA > dateB) return -1;
        if (dateA === dateB) return 0;
        if (dateA < dateB) return 1;
    }

    return <div className="observations-root">
        <header>
            <span>
                {!subject ? "Loading..." 
                : `${removeNumbersFromString(`${subject.name[0].given[0]} ${subject.name[0].family}`)} - medication requests`}
            </span>
        </header>
        <main>
            <div className="content-container">
                { !observations 
                ? <span>Loading...</span>
                : observations.length === 0 
                    ? <span>No medication requests available</span>
                    : observations.sort(sortFunc).map(observation => 
                    <MedRequest
                        key={observation.resource.id}
                        observation={observation}/>
                    )}
            </div>
            <div className="links">
                <Link to={`/patient/${id}`}>
                    <span>Patient Data</span>
                </Link>
            </div>
        </main>
    </div>;
}

export default MedRequestList;