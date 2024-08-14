import React, { useState, useContext } from 'react';
import UserContext from '../UserContext';
import JoblyApi from '../api';

const ProfileForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: '', // user needs to re-enter their password to confirm changes
  });
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    try {
      let updatedUser = await JoblyApi.saveProfile(currentUser.username, profileData);
      setFormData((fData) => ({
        ...fData,
        password: '',
      }));
      setSaveConfirmed(true);
      setCurrentUser(updatedUser);
    } catch (errors) {
      setFormErrors(errors);
      setSaveConfirmed(false);
    }
  };

  return (
    <div className="ProfileForm">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled
          />
        </div>

        <div>
          <label>First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {formErrors.length ? (
          <div>
            {formErrors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}

        {saveConfirmed ? <div>Profile updated successfully!</div> : null}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileForm;