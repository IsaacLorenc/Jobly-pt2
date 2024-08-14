import React, { useState, useEffect } from 'react';
import CompanyCard from './CompanyCard';
import JoblyApi from '../api'; 

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const companies = await JoblyApi.getCompanies(search);
        setCompanies(companies);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCompanies();
  }, [search]);

  return (
    <div>
      <h1>All Companies</h1>
      <input
        type="text"
        placeholder="Search companies"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {companies.length > 0 ? (
          companies.map(company => (
            <CompanyCard key={company.handle} company={company} />
          ))
        ) : (
          <p>No companies found.</p>
        )}
      </div>
    </div>
  );
}

export default CompanyList;