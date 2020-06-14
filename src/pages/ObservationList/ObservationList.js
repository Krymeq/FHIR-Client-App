import React, { useEffect, useState } from 'react';
import "./ObservationList.scss";
import { useParams } from 'react-router-dom';
import { serverURL } from '../../config'

const ObservationList = props => {
    const { id } = useParams();
    const [subject, setSubject] = useState(null);
    const [observations, setObservations] = useState(null);
    const [nextPage, setNextPage] = useState("");
    const [prevPage, setPrevPage] = useState("");
    const [url, setURL] = useState(`${serverURL}/Patient`);

    const handleResponse = res => {
        const next = res.link.find(e => e.relation === "next");
        const prev = res.link.find(e => e.relation === "previous");
        setObservations(res.entry);
        setNextPage(!!next ? next.url : "");
        setPrevPage(!!prev ? prev.url : "");
    }
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(res => handleResponse(res))

        fetch(`${serverURL}/Patient/${id}`)
        .then(res => res.json())
        .then(res => setSubject(res));
    })
    return (
    <h1>Hello there</h1>);
}

export default ObservationList;