import React from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import jobsData from '../data.json';
import Header from "./Header";

export default function JobDetail() {
    const { position } = useParams();
    const job = jobsData.find(j => j.position === position);

    return (
        <>
            <div className="container">
                <Header/>
                <div className="details-container">
                    <div className="details-top">
                        <img src={job.logo}  style={{ background: job.logoBackground }}/>
                        <div className="mid-section">
                            <div className="mid-text">
                                <h3>{job.company}</h3>
                                <h5>{job.company}.com</h5>
                            </div>
                                <button className="details-button">
                                    <Link to={job.website}>Şirket Sayfası</Link>
                                </button>
                        </div>
                    </div>
                    <div className="inner-details">
                        <div className="details-mid">
                            <div className="about-job">
                               <div className="about-job-left">
                                <h6>{job.postedAt} . {job.contract}</h6>
                                    <h1>{job.position}</h1>
                                    <span>{job.location}</span>
                               </div>
                               <div className="about-job-right">
                                    <button className='btn apply'>Başvur</button>
                               </div>
                            </div>
                        </div>
                        
                        <p className='description'>{job.description}</p>

                        <div className="requiretments">
                            <h2>Gereksinimler</h2>
                            <p>{job.requirements && job.requirements.content}</p>
                            <ul className="requiretments-lists">
                            {job.requirements && job.requirements.items && job.requirements.items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="whatyoudo">
                                <h2>Ne yapacaksınız, sizden beklentimiz</h2>
                                <p>{job.role && job.role.content}</p>
                                <ol className='whatyoudo-lists'>
                                {job.role && job.role.items && job.role.items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="details-bottom">
                    <span className="details-left">
                        <h4>{job.position}</h4>
                        <h6>So Digital Inc.</h6>
                    </span>
                    <div className="about-job-right">
                        <button className='btn apply'>Başvur</button>
                    </div>                   
                </div>
            </div>
        </>
    )
}