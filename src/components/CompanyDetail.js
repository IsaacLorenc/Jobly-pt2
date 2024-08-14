import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import JobCard from './JobCard';
import JoblyApi from '../api';
import UserContext from '../UserContext';

const CompanyDetail = () => {
  const { handle } = useParams();
  const { currentUser } = useContext(UserContext);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      let company = await JoblyApi.getCompany(handle);
      let appliedJobIds = new Set(currentUser.applications);
      company.jobs = company.jobs.map(job => ({
        ...job,
        applied: appliedJobIds.has(job.id)
      }));
      setCompany(company);
    }
    fetchCompany();
  }, [handle, currentUser]);

  if (!company) return <div>Loading...</div>;

  return (
    <div className="CompanyDetail">
      <h3>{company.name}</h3>
      <p>{company.description}</p>
      <div>
        {company.jobs.map(job => (
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
    </div>
  );
};

export default CompanyDetail;