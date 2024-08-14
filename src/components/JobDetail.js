import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api'; // Import the API helper

function JobDetail() {
  const [job, setJob] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchJob() {
      try {
        const job = await JoblyApi.getJob(id);
        setJob(job);
      } catch (err) {
        console.error(err);
      }
    }
    fetchJob();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.companyName}</p>
      <p>{job.salary ? `Salary: $${job.salary}` : 'Salary: Not specified'}</p>
      <p>{job.equity ? `Equity: ${job.equity}` : 'Equity: Not specified'}</p>
      <p>{job.description}</p>
      {/* Add more job details as needed */}
    </div>
  );
}

export default JobDetail;