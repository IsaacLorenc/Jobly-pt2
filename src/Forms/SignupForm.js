import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from './UserContext';

function SignUpForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { signup } = useContext(UserContext);
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      history.push('/');
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;