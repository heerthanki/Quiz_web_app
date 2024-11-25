import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Submission.css'; // Import CSS file

const Submissions = () => {
  const [submissionData, setSubmissionData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch submissions data from the backend API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/get-results'); // Fetch data from the working route
        const data = await response.json();
        if (data.success) {
          setSubmissionData(data.data); // Update state with fetched data
        } else {
          console.error('Failed to fetch submissions:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <nav className="navbar">
        <Link to="/adminpanel" className="back-arrow">&#8592;</Link>
        <h2>Show Submissions</h2>
      </nav>
      <div className="submissions-container">
        <h2>Submissions</h2>

        {loading ? (
          <p>Loading submissions...</p>
        ) : submissionData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Subject Code</th>
                <th>Date</th>
                <th>Score</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {submissionData.map((submission) => (
                <tr key={submission._id}>
                  <td>{submission.username}</td>
                  <td>{submission.subjectCode}</td>
                  <td>{new Date(submission.date).toLocaleDateString()}</td>
                  <td>{submission.score}</td>
                  <td>{submission.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No submissions available.</p>
        )}
      </div>
    </div>
  );
};

export default Submissions;
