import React from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import jobsData from '../data.json';
import Header from "./Header";

export default function JobDetail() {
    const { position } = useParams();
    const job = jobsData.find(j => j.position === position);

    if (!job) {
        return <div>Job not found</div>;
    }

    return (
        <>
            <Header/>
            <div className="details-container">
                <div className="details-top">
                    <img src={job.logo} alt="logo" />
                    <span className="mid-section">
                        <h3>{job.company}</h3>
                        <h5>{job.company}.com</h5>
                    </span>
                    <div className="details-top-end">
                    <button>
                        <Link to={job.website}>Şirket Sayfası</Link>
                    </button>
                </div>
                </div>
                <div className="details-mid">
                    <div className="about-job">
                        <h6>{job.postedAt} . {job.contract}</h6>
                        <h1>{job.position}</h1>
                        <span>{job.location}</span>
                    </div>
                </div>
                
            </div>
        </>
    )
}