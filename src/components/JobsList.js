import React, { useState, useEffect, useContext } from 'react';
import JobCard from './JobCard';
import JoblyApi from '../api';
import UserContext from '../UserContext';

const JobsList = () => {
  const { currentUser } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      let jobs = await JoblyApi.getJobs();
      let appliedJobIds = new Set(currentUser.applications);
      jobs = jobs.map(job => ({
        ...job,
        applied: appliedJobIds.has(job.id)
      }));
      setJobs(jobs);
    }
    fetchJobs();
  }, [currentUser]);

  return (
    <div className="JobsList">
      {jobs.map(job => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          applied={job.applied}
        />
      ))}
    </div>
  );
};

export default JobsList;