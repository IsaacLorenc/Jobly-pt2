import React from 'react';
import { Link } from 'react-router-dom';
import './CompanyCard.css';

function CompanyCard({ company }) {
  return (
    <div className="company-card">
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <Link to={`/companies/${company.handle}`}>View Details</Link>
    </div>
  );
}

export default CompanyCard;