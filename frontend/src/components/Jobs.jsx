import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobsData from '../data/jobs.json';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('featured');
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setJobs(jobsData.jobs);
            setLoading(false);
        } catch (err) {
            setError('Failed to load jobs');
            setLoading(false);
        }
    }, []);

    const filteredJobs = jobs.filter(job => {
        if (activeTab === 'featured') return job.featured;
        return job.type === activeTab;
    });

    const handleFavorite = (jobId) => {
        setFavorites(prev => prev.includes(jobId) 
            ? prev.filter(id => id !== jobId)
            : [...prev, jobId]
        );
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Job Listing</h1>
                <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                    <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                        <li className="nav-item">
                            <a 
                                className={`d-flex align-items-center text-start mx-3 ms-0 pb-3 ${activeTab === 'featured' ? 'active' : ''}`}
                                onClick={() => setActiveTab('featured')}
                                role="button"
                            >
                                <h6 className="mt-n1 mb-0">Featured</h6>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                className={`d-flex align-items-center text-start mx-3 pb-3 ${activeTab === 'Full Time' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Full Time')}
                                role="button"
                            >
                                <h6 className="mt-n1 mb-0">Full Time</h6>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                className={`d-flex align-items-center text-start mx-3 pb-3 ${activeTab === 'Part Time' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Part Time')}
                                role="button"
                            >
                                <h6 className="mt-n1 mb-0">Part Time</h6>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade show p-0 active">
                            {filteredJobs.map((job) => (
                                <div key={job.id} className="job-item p-4 mb-4">
                                    <div className="row g-4">
                                        <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                            <img className="flex-shrink-0 img-fluid border rounded" 
                                                 src={job.companyLogo} 
                                                 alt={job.companyName} 
                                                 style={{width: "80px", height: "80px"}} 
                                            />
                                            <div className="text-start ps-4">
                                                <h5 className="mb-3">{job.title}</h5>
                                                <span className="text-truncate me-3">
                                                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                                                    {job.location}
                                                </span>
                                                <span className="text-truncate me-3">
                                                    <i className="far fa-clock text-primary me-2"></i>
                                                    {job.type}
                                                </span>
                                                <span className="text-truncate me-0">
                                                    <i className="far fa-money-bill-alt text-primary me-2"></i>
                                                    {job.salary}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                            <div className="d-flex mb-3">
                                                <button 
                                                    className={`btn btn-light btn-square me-3 ${favorites.includes(job.id) ? 'active' : ''}`}
                                                    onClick={() => handleFavorite(job.id)}
                                                >
                                                    <i className="far fa-heart text-primary"></i>
                                                </button>
                                                <Link to={`/message/${job.id}`} className="btn btn-secondary">
                                                    <i className="fas fa-comment-alt text-white"></i> Message
                                                </Link>
                                            </div>
                                            <small className="text-truncate">
                                                <i className="far fa-calendar-alt text-primary me-2"></i>
                                                Date Line: {job.postedDate}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jobs;
