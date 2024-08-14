import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../UserContext';
import JoblyApi from '../api';

const JobCard = ({ id, title, salary, equity, applied }) => {
  const { currentUser } = useContext(UserContext);
  const [hasApplied, setHasApplied] = useState(applied);

  useEffect(() => {
    setHasApplied(applied);
  }, [applied]);

  const handleApply = async () => {
    try {
      await JoblyApi.applyToJob(id);
      setHasApplied(true);
    } catch (err) {
      console.error("Failed to apply to job:", err);
    }
  };

  return (
    <div className="JobCard">
      <h5>{title}</h5>
      <p>Salary: {salary ? `$${salary}` : 'N/A'}</p>
      <p>Equity: {equity ? equity : 'N/A'}</p>
      {hasApplied ? (
        <button disabled className="btn btn-secondary">Applied</button>
      ) : (
        <button onClick={handleApply} className="btn btn-primary">Apply</button>
      )}
    </div>
  );
};

export default JobCard;