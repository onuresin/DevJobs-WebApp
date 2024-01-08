import React, { useEffect, useState } from 'react';


export default function Filter() {
    const [jobs, setJobs] = useState ([]);
    const [filteredJobs, setFilteredJobs] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [fullTimefilter, setFulltimeFilter] = useState(false);

// ()    
    useEffect(() => {
        fetch('/data.json')
        .then((response) => response.json())
        .then((data) => {
          setJobs(data);
          setFilteredJobs(data);
        });
      }, []);
      const handleFilter = () => {
        let filteredData = jobs;

        if (locationFilter) {
            filteredData = filteredData.filter((job) => 
            job.location.toLowerCase().includes(locationFilter.toLocaleLowerCase())
            );
        }
        if (fullTimefilter) {
            filteredData = filteredData.filter((job) => job.contract === 'Full Time');
        }
        setFilteredJobs(filteredData);
      }

      useEffect(() => {
        handleFilter();
      }, [searchTerm, locationFilter, fullTimefilter])

      const handleSearch = (e) => {
        e.preventDefault();
        handleFilter();
      };
    
    return(
        <>
            <div className="search-filter">
                <div className="bar-section">
                    <form >
                        <label><img src="src/assets/images/search-icon.svg"/></label>
                        <input type="text" placeholder='Filter by title, companies, expertise…' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>
                    </form>
                </div>
                <div className="local-section">
                    <form action="">
                        <label><img src="src/assets/images/gps-icon.svg"/></label>
                        <input type="text" placeholder='Filter by location…' value={locationFilter} onChange={(e)=> setLocationFilter(e.target.value)} />
                    </form>
                </div>
                <div className="fulltime-section">
                    <label>
                        <input type="checkbox" checked={fullTimefilter} onChange={() => setFulltimeFilter(!setFulltimeFilter)} />
                        <h4>Full Time Only</h4>
                    </label>
                </div>
                <button onClick={handleSearch}>ARA</button>
            </div>
            
        </>
    )
}