import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Filter() {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [fullTimeFilter, setFullTimeFilter] = useState(false);
  const [visibleJobs, setVisibleJobs] = useState(3);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);


  const handleLoadMore = () => {
    setVisibleJobs(visibleJobs + 3);
  };

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setAllJobs(data);
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

    if (filteredData.length === 0) {
      setError('Aranan kriterlere uygun iş bulunamadı.');
    } else {
      setError(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm && !locationFilter && !fullTimeFilter) {
      setError('Filtreleme yapmadan arama yapmayınız!');
      return;
    }

    handleFilter();
  };
  const toggleModal = () => {
    setModal(!modal)
}
if(modal) {
  document.body.classList.add('active-modal')
} else {
  document.body.classList.remove('active-modal')
}


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
          <img src="/Public/images/stick.svg" alt="stick" />
        </div>
        <div className="local-section">
          <div className="vertical"></div>
          <form>
            <img src="src/assets/images/gps-icon.svg" alt="gps-icon" />
            <input
              type="text"
              placeholder="Lokasyona göre filtrele..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </form>
          <img src="/Public/images/stick.svg" alt="stick" />
        </div>
        <div className="fulltime-section">
          <div className="vertical"></div>
          <label>
            <input
              type="checkbox"
              checked={fullTimeFilter}
              onChange={() => setFullTimeFilter(!fullTimeFilter)}
            />
            <h4>Tam Zamanlı</h4>
          </label>
        </div>
        <button className="btn" onClick={handleSearch}>
          İŞ ARA
        </button>
      </div>
      <div className="modal-section">
        <div className="modal-left">
          <form>
            <input type="text" placeholder='Filtrele...' value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}/>
          </form>
        </div>
        <div className="modal-right">
        
          <button className='modal-btn' onClick={toggleModal}><img src="/Public/images/modal-path-light.svg"/></button>
          <button className="mobile-btn" onClick={handleSearch}>
            <img src="/Public/images/mobil-search-button.svg"/>
        </button>
        </div>
      </div>
      {/* MODAL BÖLÜM DİV */}
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className='before-opened'></div>
          <div className="modal-content">
            <div className="content-top">
              <form>
                <img src="src/assets/images/gps-icon.svg" alt="gps-icon" />
              <input
                type="text"
                placeholder="Lokasyona göre filtrele..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </form>
            </div>
            <div className='content-stick'></div>
            <div className="content-bot">
              <label>
              <input
                type="checkbox"
                checked={fullTimeFilter}
                onChange={() => setFullTimeFilter(!fullTimeFilter)}
              />
              <h4>Tam Zamanlı</h4>
            </label>
            </div>
            <button className="modalBtn" onClick={toggleModal}>Kapat</button>
          </div>
        </div>
      )}
      <div className="jobsSection">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          filteredJobs.slice(0, visibleJobs).map((job) => (
            <div className="job-item" key={job.id}>
              <img src={job.logo} alt="" />
              <div className="job-item-innerbox">
                <div className="job-content">
                  <h6>
                    {job.postedAt} . {job.contract}
                  </h6>
                  <h2>
                    <Link to={`/jobDetail/${job.position}`}>{job.position}</Link>
                  </h2>
                  <p>{job.company}</p>
                </div>

                <div className="location">
                  <p>
                    <span>{job.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="loader-button">
        {visibleJobs < filteredJobs.length && (
          <button className="btn" onClick={handleLoadMore}>
            Daha Fazla Yükle
          </button>
        )}
      </div>
    </>
  );
}
