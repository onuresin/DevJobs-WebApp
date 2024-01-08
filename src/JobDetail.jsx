import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function JobDetails() {
    const { position } = useParams();
    const job = jobs.find(j => j.position === position);

    return (
        <>
            <div className="details-container">
                <div className="details-top">
                    <img src={job.logo} alt="logo" />
                    <span className="mid-section">
                        <h3>{job.company}</h3>
                        <h5>{job.company}.com</h5>
                    </span>
                </div>
                <div className="details-end">
                    <button>
                        <Link to={job.website}>Şirket Sayfası</Link>
                    </button>
                </div>
            </div>
        </>
    )
}