import React, { useState } from 'react';
import './quoteModal.css';
import logo from '../../assets/MP 1.png';

const QuoteModal = ({ isOpen, onClose }) => {
  const [userType, setUserType] = useState('individual');
  const [formData, setFormData] = useState({
    companyName: '',
    contactPersonEmail: '',
    contactPersonFullName: '',
    contactPersonPhone: '',
    fullName: '',
    email: '',
    phone: '',
    projectDescription: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSuccessMessage('Your quote request has been submitted successfully!');
    // Reset form fields
    setFormData({
      companyName: '',
      contactPersonEmail: '',
      contactPersonFullName: '',
      contactPersonPhone: '',
      fullName: '',
      email: '',
      phone: '',
      projectDescription: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="quote-modal-overlay">
      <div className="quote-modal">
        <img src={logo} alt="Logo" className="quote-modal-logo" />
        <h2>Request a Quote</h2>
        <form onSubmit={handleSubmit}>
          <div className="quote-modal-radio-group">
            <label className={`radio-label ${userType === 'company' ? 'selected' : ''}`}>
              <input
                type="radio"
                value="company"
                checked={userType === 'company'}
                onChange={() => setUserType('company')}
              />
              Company
            </label>
            <label className={`radio-label ${userType === 'individual' ? 'selected' : ''}`}>
              <input
                type="radio"
                value="individual"
                checked={userType === 'individual'}
                onChange={() => setUserType('individual')}
              />
              Individual
            </label>
          </div>

          {userType === 'company' && (
            <>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="contactPersonFullName"
                placeholder="Contact Person Full Name(s)"
                value={formData.contactPersonFullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="contactPersonEmail"
                placeholder="Contact Person Email"
                value={formData.contactPersonEmail}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="contactPersonPhone"
                placeholder="Contact Person Phone"
                value={formData.contactPersonPhone}
                onChange={handleChange}
                required
              />
            </>
          )}

          {userType === 'individual' && (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name(s)"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </>
          )}

          <textarea
            name="projectDescription"
            placeholder="Describe your project"
            value={formData.projectDescription}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>

        {successMessage && <p className="quote-modal-success">{successMessage}</p>}
        <button className="quote-modal-close" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default QuoteModal;
