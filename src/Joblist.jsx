import { useState } from "react";

// () []
export default function Joblist({ Jobs }) {
    const [visibleJobs, setVisibleJobs] = useState(3);

    const handleLoadMore = () => {
        setVisibleJobs(visibleJobs + 3);
    }
    return (
        <>
           <div className="jobsSection">
              {jobs.slice(0, visibleJobs).map((job) => (
                <div className="sectionInner" key={job.id}>
                    <img src="{job.logo}" alt="{job.company}"/>
                    <span className="job-time">
                        {job.postedAt}
                        {job.contract}
                    </span>
                    <span className="job-pos">
                        {job.position}
                    </span>
                    <span className="job-company">
                        {job.company}
                    </span>
                    <span className="localization">
                        {job.location}
                    </span>
                </div> ))}
            {visibleJobs < jobs.length && (
                <button onClick={handleLoadMore}>Daha Fazla İlan Yükle</button>
            )}
            </div> 
        </>
    )
}
