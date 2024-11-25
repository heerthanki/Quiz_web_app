import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [ongoingExams, setOngoingExams] = useState([]);
  const navigate = useNavigate();

  const handleStartExam = async (subjectCode) => {
    try {
      // Step 1: Fetch the test details to get the question counts
      const testResponse = await axios.get(`http://localhost:5000/tests/${subjectCode}`);
      const test = testResponse.data;
      console.log('Fetched test:', test);
  
      // Step 2: Fetch questions based on those counts
      const questionsResponse = await axios.get(`http://localhost:5000/questions/${subjectCode}`);
      const { easy, medium, hard } = questionsResponse.data;
  
      // Combine all questions into one array
      const allQuestions = [...easy, ...medium, ...hard];
  
      // Navigate to the exam page and pass the questions as state
      navigate('/Studentpanel/exam', { state: { questions: allQuestions }, state: { subjectCode, questions: allQuestions } });
    } catch (error) {
      console.error('Error starting exam:', error);
    }
  };
  
  
  useEffect(() => {
    // Fetch upcoming exams from the backend
    const fetchUpcomingExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tests/Upcoming');
        setUpcomingExams(response.data);
      } catch (error) {
        console.error('Error fetching upcoming exams:', error);
      }
    };

    // Fetch ongoing exams from the backend
    const fetchOngoingExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tests/Ongoing');
        setOngoingExams(response.data);
      } catch (error) {
        console.error('Error fetching ongoing exams:', error);
      }
    };

    fetchUpcomingExams();
    fetchOngoingExams();
  }, []);

  const isExamDatePassed = (examDate) => {
    const currentDate = new Date();
    const examDateTime = new Date(examDate);
    return currentDate > examDateTime;
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // HH:MM format
    return `Date: ${formattedDate} Time: ${formattedTime}`;
  };
  
  return (
    <div className="dashboard-container">
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/Studentpanel/profile">
              <FaUser className="icon-student" />
            </Link>
          </li>
        </ul>
        <div className="logo">
          <Link to="/">Exam Portal</Link>
        </div>
      </nav>
      <div className="content">
        <div className="upcoming-exams">
          <h2>Upcoming Exams</h2>
          {upcomingExams.length > 0 ? (
            upcomingExams.map((exam) => (
              <div className="exam-card" key={exam._id}>
                <h3>Subject Code: {exam.subjectCode}</h3>
                <p>{formatDateTime(exam.date)}</p>
                <button disabled={!isExamDatePassed(exam.date)}>Start</button>
              </div>
            ))
          ) : (
            <p>No upcoming exams.</p>
          )}
        </div>
        <div className="ongoing-exams">
          <h2>Ongoing Exams</h2>
          {ongoingExams.length > 0 ? (
            ongoingExams.map((exam) => (
              <div className="exam-card" key={exam._id}>
                <h3>Subject Code: {exam.subjectCode}</h3>
                <p>{formatDateTime(exam.date)}</p>
                <button onClick={() => handleStartExam(exam.subjectCode)}>Start Exam</button>
              </div>
            ))
          ) : (
            <p>No ongoing exams.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;