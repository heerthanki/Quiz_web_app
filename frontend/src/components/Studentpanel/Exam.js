import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './Exam.css';

const Exam = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get logged-in user details

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const subjectCode = location.state?.subjectCode || '';
  const questions = location.state?.questions || [];

  const handleSubmit = async () => {

  
    if (!user) {
      alert('You must be logged in to submit the exam.');
      return;
    }
  
    let correctCount = 0;
  
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctOptionIndex) {
        correctCount++;
      }
    });
  
    const score = correctCount;
    const total = questions.length;
    console.log('Submitting payload:', {
      username: user.username,
      subjectCode,
      date: new Date().toISOString(),
      score,
      total,
      answers: selectedAnswers,
    });
  
    try {
      const response = await fetch('http://localhost:5000/api/submit-exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username, // Send the logged-in student's name
          subjectCode,
          date: new Date().toISOString(),
          score,
          total,
          answers: selectedAnswers, // Optional: Include answers
        }),
      });
  
      const data = await response.json();
      // if (data.success) {
      //   alert(`You scored ${score} out of ${total}`);
      //   navigate('/studentpanel/dashboard');
      // } else {
      //   alert('Failed to submit exam.');
      // }
      if (response.ok) {
        console.log('Submission successful:', data);
        alert('Exam submitted successfully!');
        navigate('/Studentpanel/dashboard');
      } else {
        console.error('Submission failed:', data.message);
        alert('Failed to submit exam. ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="exam-container">
      <h1 className="exam-title">Exam Questions</h1>
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <div key={index} className="question-card">
            <h3 className="question-text">{question.question}</h3>
            <div className="options-container">
              {question.options.map((option, i) => (
                <div key={i} className="option">
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={i}
                      checked={selectedAnswers[index] === i}
                      onChange={() =>
                        setSelectedAnswers({
                          ...selectedAnswers,
                          [index]: i,
                        })
                      }
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="no-questions">No questions available</p>
      )}
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Exam;
