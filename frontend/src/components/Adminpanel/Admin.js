import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import { FaUser } from 'react-icons/fa'; // Assuming you're using Font Awesome for icons

const AdminPanel = () => {
  return (
    <div className="Admin">
      <div className="Nav-bar">
        <div className="profile">
          <Link to="/Adminpanel/profile">
            { <FaUser className="icon" /> }
          </Link>
        </div>
        <div className="title">Admin Panel</div>
      </div>
      <br />
      <div className="admin-card-container">
        <Link to="/Adminpanel/addquestions" className="admin-card link" role="button" tabIndex={0}>
          Add Questions
        </Link>
        <Link to="/Adminpanel/addtest" className="admin-card link" role="button" tabIndex={0}>
          Add Test
        </Link>
        <Link to="/Adminpanel/feedback" className="admin-card link" role="button" tabIndex={0}>
          Feedback Form
        </Link>
        <Link to="/Adminpanel/submissions" className="admin-card link" role="button" tabIndex={0}>
          Submissions
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;