import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Filter() {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [fullTimeFilter, setFullTimeFilter] = useState(false);
  const [visibleJobs, setVisibleJobs] = useState(3);

  const handleLoadMore = () => {
    setVisibleJobs(visibleJobs + 3);
  };

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setAllJobs(data);
        setFilteredJobs(data);
      });
  }, []);

  const handleFilter = () => {
    let filteredData = allJobs;

    if (locationFilter) {
      filteredData = filteredData.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    if (fullTimeFilter) {
      filteredData = filteredData.filter((job) => job.contract === 'Full Time');
    }
    if (searchTerm) {
      filteredData = filteredData.filter(
        (job) =>
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJobs(filteredData);
  };

  useEffect(() => {
    handleFilter();
  }, [searchTerm, locationFilter, fullTimeFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    handleFilter();
  };

  return (
    <>
      <div className="search-filter">
        <div className="bar-section">
          <form>
            <label>
              <img src="src/assets/images/search-icon.svg" alt="search-icon" />
            </label>
            <input
              type="text"
              placeholder="Şirket, tecrübe ve başlığa göre filtrele..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
        <div className="local-section">
          <form action="">
            <label>
              <img src="src/assets/images/gps-icon.svg" alt="gps-icon" />
            </label>
            <input
              type="text"
              placeholder="Lokasyona göre filtrele..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </form>
        </div>
        <div className="fulltime-section">
          <label>
            <input
              type="checkbox"
              checked={fullTimeFilter}
              onChange={() => setFullTimeFilter(!fullTimeFilter)}
            />
            <h4>Sadece Tam Zamanlı</h4>
          </label>
        </div>
        <button onClick={handleSearch}>İŞ ARA</button>
      </div>
      <div className="jobsSection">
        {filteredJobs.slice(0, visibleJobs).map((job) => (
          <div className="job-item" key={job.id}>
            <img src={job.logo} alt="" />
            <div className="job-content">
              <h6>
                {job.postedAt} . {job.contract}
              </h6>
              <h1>
                <Link to={`/jobDetail/${job.position}`}>{job.position}</Link>
              </h1>
              <p>{job.company}</p>
            </div>

            <div className="location">
              <p>
                <span>{job.location}</span>
              </p>
            </div>
          </div>
        ))}

        {visibleJobs < filteredJobs.length && (
          <div className="loadMore">
            <button className="btn" onClick={handleLoadMore}>
              Daha Fazla Yükle
            </button>
          </div>
        )}
      </div>
    </>
  );
}
